# Webserver
from flask import Flask, jsonify, request
import json
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
# Database
import sqlite3
# Models
import pickle
# Text Analysis
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


# POST: Partial Category Prediction - Train
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


# POST: Partial Category - Prediction
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


# POST: Sentiment Analysis
@app.route("/api/python/sentiment-analysis", methods=['POST'])
def sentiment_analysis():
    
    # Input
    parameters = request.get_json()
    new_comment = parameters['input']
    tfidf = pickle.load(open('tfidf.pkl', 'rb'))
    new_comment = tfidf.transform([new_comment])

    # Analyze
    textclassifier = pickle.load(open('textclassifier.pkl', 'rb'))
    output = textclassifier.predict(new_comment)[0]

    #Output
    if (output == 1):
        return jsonify({'output': "Positive"})
    else:
        return jsonify({'output': "Negative"})


# GET: Categories Distinct
@app.route("/api/python/categories/distinct")
def categories_distinct():
    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    categories = pd.read_sql("select distinct category from categories", connection)

    categories_list = categories.values.tolist()

    flat_list = [item for sublist in categories_list for item in sublist]

    return jsonify({'categories': flat_list})


# GET: Categories Table
@app.route("/api/python/categories")
def categories():
    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    categories = pd.read_sql("select * from categories group by category", connection)

    categories_list = categories.values.tolist()

    return jsonify({'categories': categories_list})


# GET: Podcast Table
@app.route("/api/python/podcasts")
def podcasts():
    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    podcasts = pd.read_sql("select * from podcasts", connection)
    podcasts = podcasts.head(100)

    podcasts_list = podcasts.values.tolist()

    return jsonify({'podcasts': podcasts_list})


# GET: Reviews Table
@app.route("/api/python/reviews")
def reviews():
    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    reviews = pd.read_sql("select * from reviews group by podcast_id", connection)
    reviews = reviews.head(100)

    reviews_list = reviews.values.tolist()

    return jsonify({'reviews': reviews_list})


# GET: Runs Table
@app.route("/api/python/runs")
def runs():
    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    runs = pd.read_sql("select * from runs", connection)

    runs_list = runs.values.tolist()

    return jsonify({'runs': runs_list})


# POST: Filter Podcast By Title
@app.route("/api/python/filter", methods=['POST'])
def filter():
    
    # Input
    parameters = request.get_json()
    word = parameters['input']
    regex = "'%" + word + "%'"
    query = "select title from podcasts where title like " + regex
    
    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    result = pd.read_sql(query, connection)

    result_list = result.values.tolist()

    return jsonify({'output': result_list})
    

# POST: Search Podcast By Title
@app.route("/api/python/search", methods=['POST'])
def search():

    # Input
    parameters = request.get_json()
    title = parameters['input']
    regex = "'" + title + "'"
    query = "select * from podcasts where title like " + regex

    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    result = pd.read_sql(query, connection)

    result_list = result.values.tolist()

    return jsonify({'output': result_list})

# POST: Search Categories To Podcast
@app.route("/api/python/search/categories", methods=['POST'])
def search_categories():

    # Input
    parameters = request.get_json()
    title = parameters['input']
    regex = "'" + title + "'"
    query = "select category from categories where podcast_id like " + regex

    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    result = pd.read_sql(query, connection)

    result_list = result.values.tolist()

    return jsonify({'output': result_list})

# POST: Search Reviews To Podcast
@app.route("/api/python/search/reviews", methods=['POST'])
def search_reviews():

    # Input
    parameters = request.get_json()
    title = parameters['input']
    regex = "'" + title + "'"
    query = "select * from reviews where podcast_id like " + regex

    # Database Connection
    connection = sqlite3.connect("podcasts.db")
    result = pd.read_sql(query, connection)

    result_list = result.values.tolist()

    return jsonify({'output': result_list})


if __name__ == '__main__':
    app.run(host=HOST,debug=True,port=PORT)