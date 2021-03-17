# Webserver
from flask import Flask, jsonify, request
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
# Text Analysis
import sqlite3
import pickle
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer

# http://localhost:5000
HOST = '0.0.0.0'
PORT = 5000

app = Flask(__name__)

# Function for Category Prediction
def predict_category(input, model):
    output = model.predict([input])
    return output

# Partial Category Prediction
def decision_maker(subject, categories):
    x = False
    for cat in categories:
        if subject == cat:
            x = True  
    return x

# POST: Full Category Prediction
@app.route("/api/python/full-category-predict", methods=['POST'])
def full_cat_pred():
    # Input
    parameters = request.get_json()
    # Model
    fullcatpred = pickle.load(open('fullcatpred.pkl', 'rb'))
    # Predict
    output = predict_category(parameters['input'], fullcatpred)[0]
    # Output
    return jsonify({'output': output})

# POST: Partial Category Prediction Train
@app.route("/api/python/partial-category-predict/train", methods=['POST'])
def partial_cat_pred_train():
    # Input for Train
    parameters = request.get_json()
    categories = parameters['categories']

    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    reviews = pd.read_sql("select reviews.content, categories.category from reviews, categories where reviews.podcast_id = categories.podcast_id", connection)

    content = []
    category = []
    # Filter Tables 
    for ind in reviews.index:
        if (decision_maker(reviews['category'][ind], categories)):
            content.append(reviews['content'][ind])
            category.append(reviews['category'][ind])
    # Fit Model
    model = make_pipeline(TfidfVectorizer(), MultinomialNB())
    model.fit(content, category)

    # Dump Model
    pickle.dump(model, open('partialcatpred.pkl','wb'))
    return jsonify({'output': "Model Trained"})

# POST: Partial Category Prediction
@app.route("/api/python/partial-category-predict/predict", methods=['POST'])
def partial_cat_pred_pred():
    # Input
    parameters = request.get_json()
    # Model
    partialcatpred = pickle.load(open('partialcatpred.pkl', 'rb'))
    # Predict
    output = predict_category(parameters['input'], partialcatpred)[0]
    # Output
    return jsonify({'output': output})

# GET: Podcast Categories
@app.route("/api/python/categories")
def categories():
    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    categories = pd.read_sql("select distinct category from categories", connection)

    categories_list = categories.values.tolist()

    flat_list = [item for sublist in categories_list for item in sublist]

    return jsonify({'categories': flat_list})

if __name__ == '__main__':
    app.run(host=HOST,debug=True,port=PORT)