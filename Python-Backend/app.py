# Webserver
from flask import Flask, jsonify, request
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
# Database
import sqlite3
# Models
import pickle
# Text Analysis
import pandas as pd
from sklearn.pipeline import make_pipeline
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer


# http://localhost:5000
HOST = '0.0.0.0'
PORT = 5000
global bgColorShade
bgColorShade = 5

app = Flask(__name__)

# Function for Category Prediction
def predict_category(input, model):
    output = model.predict([input])
    return output

##### Home #####
# Home Page
@app.route("/")
def index():
    return "<h1>Hello World!</h1><p>This is a simple Python Flask web server for my Text Analysis Blog. For more information checkout <a href=http://localhost:4200>http://localhost:4200</a> or visit <a href=https://github.com>GitHub</a>.</p>"

# GET: BG Color Shade (Get)
@app.route("/api/python/bg-color-shade")
def get_bg():
    global bgColorShade
    return jsonify({'shade': bgColorShade})

# POST: BG Color Shade (Set)
@app.route("/api/python/bg-color-shade", methods=['POST'])
def set_bg():
    # Input
    parameters = request.get_json()
    global bgColorShade
    bgColorShade = parameters['shade']

    return jsonify({'shade': bgColorShade})


##### Tables #####
# GET: Categories Table
@app.route("/api/python/categories")
def categories():
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    categories = pd.read_sql("select * from categories group by category", connection)

    categories_list = categories.values.tolist()

    return jsonify({'categories': categories_list})

# GET: Podcast Table
@app.route("/api/python/podcasts")
def podcasts():
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    podcasts = pd.read_sql("select * from podcasts", connection)
    podcasts = podcasts.head(100)

    podcasts_list = podcasts.values.tolist()

    return jsonify({'podcasts': podcasts_list})

# GET: Reviews Table
@app.route("/api/python/reviews")
def reviews():
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    reviews = pd.read_sql("select * from reviews group by podcast_id", connection)
    reviews = reviews.head(100)

    reviews_list = reviews.values.tolist()

    return jsonify({'reviews': reviews_list})

# GET: Runs Table
@app.route("/api/python/runs")
def runs():
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    runs = pd.read_sql("select * from runs", connection)

    runs_list = runs.values.tolist()

    return jsonify({'runs': runs_list})


##### Predictive Analytics #####
# POST: Full Category Prediction
@app.route("/api/python/full-category-predict", methods=['POST'])
def full_cat_pred():
    # Input
    parameters = request.get_json()
    # Model
    fullcatpred = pickle.load(open('models/full-category-predict.pkl', 'rb'))
    # Predict
    output = predict_category(parameters['input'], fullcatpred)[0]
    # Output
    return jsonify({'output': output})

# POST: Partial Category Prediction - Train
@app.route("/api/python/partial-category-predict/train", methods=['POST'])
def partial_cat_pred_train():
    # Input for Train
    parameters = request.get_json()
    categories = parameters['categories'].split()
    
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    reviews = pd.read_sql("select reviews.content, categories.category from reviews, categories where reviews.podcast_id = categories.podcast_id", connection)
    
    # Filter Items
    reviews = reviews[reviews['category'].isin(categories)]
    category = reviews['category'].values.tolist()
    content = reviews['content'].values.tolist()

    # Fit Model
    model = make_pipeline(TfidfVectorizer(), MultinomialNB())
    model.fit(content, category)

    # Dump Model
    pickle.dump(model, open('models/partial-category-predict.pkl','wb'))
    return jsonify({'output': 'Model Trained'})

# POST: Partial Category - Prediction
@app.route("/api/python/partial-category-predict/predict", methods=['POST'])
def partial_cat_pred_pred():
    # Input
    parameters = request.get_json()
    # Model
    partialcatpred = pickle.load(open('models/partial-category-predict.pkl', 'rb'))
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
    tfidf = pickle.load(open('models/tfidf.pkl', 'rb'))
    new_comment = tfidf.transform([new_comment])

    # Analyze
    textclassifier = pickle.load(open('models/text-classifier.pkl', 'rb'))
    output = textclassifier.predict(new_comment)[0]

    #Output
    if (output == 1):
        return jsonify({'output': "Positive"})
    else:
        return jsonify({'output': "Negative"})


##### Data Visualization - Search Podcast #####
# POST: Filter Podcast By Title
@app.route("/api/python/filter", methods=['POST'])
def filter():
    # Input
    parameters = request.get_json()
    word = parameters['input']
    regex = "'%" + word + "%'"
    query = "select title from podcasts where title like " + regex
    
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    result = pd.read_sql(query, connection)

    if (result.size > 1000):
        result = result.head(100)

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
    connection = sqlite3.connect("data/podcasts.db")
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
    connection = sqlite3.connect("data/podcasts.db")
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
    connection = sqlite3.connect("data/podcasts.db")
    result = pd.read_sql(query, connection)

    result_list = result.values.tolist()

    return jsonify({'output': result_list})


##### Data Visualization - Statistics #####
# GET : Sum Categories
@app.route("/api/python/statistics/sum-categories")
def sum_categories():
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    sum_categories = pd.read_sql("select category, count(*) as sum from categories group by category order by count(*) desc", connection)

    sum_categories_list = sum_categories.values.tolist()

    return jsonify({'statistics': sum_categories_list})

# GET : Sum Ratings
@app.route("/api/python/statistics/sum-ratings")
def sum_ratings():
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    sum_ratings = pd.read_sql("select rating, count(*) as num from reviews group by rating order by rating desc", connection)

    sum_ratings_list = sum_ratings.values.tolist()

    return jsonify({'statistics': sum_ratings_list})

# GET : Avg Ratings / Year
@app.route("/api/python/statistics/ratings-per-year")
def ratings_per_year():
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    ratings_per_year = pd.read_sql("select date, avg(rating) as atlag from (select rating, substr(created_at,1,4) as date from reviews order by created_at desc) group by date", connection)

    ratings_per_year_list = ratings_per_year.values.tolist()

    return jsonify({'statistics': ratings_per_year_list})
    
# GET : Best Categories
@app.route("/api/python/statistics/best-categories")
def best_categories():
    # Database Connection
    connection = sqlite3.connect("data/podcasts.db")
    best_categories = pd.read_sql("select category, avg(rating), count(*) from reviews join categories using (podcast_id) group by 1 order by 2 desc", connection)

    best_categories_list = best_categories.values.tolist()

    return jsonify({'statistics': best_categories_list})


if __name__ == '__main__':
    app.run(host=HOST,debug=True,port=PORT)