import pytest
import app

@pytest.fixture
def client():
    app.app.config['TESTING'] = True

    with app.app.test_client() as client:
        yield client

def test_get_home(client):
    rv = client.get('/')
    assert b"<h1>Hello World!</h1><p>This is a simple Python Flask web server for my Text Analysis Blog. For more information checkout <a href=http://localhost:4200>http://localhost:4200</a> or visit <a href=https://github.com>GitHub</a>.</p>" in rv.data

def test_get_bg_color_shade(client):
    rv = client.get('/api/python/bg-color-shade')
    json_data = rv.get_json()
    assert 0 <= json_data['shade'] <= 30

def test_post_bg_color_shade(client):
    rv = client.post('/api/python/bg-color-shade', json = { 'shade': 15 })
    json_data = rv.get_json()
    assert json_data['shade'] == 15

def test_get_categories(client):
    rv = client.get('/api/python/categories')
    json_data = rv.get_json()
    assert len(json_data['categories']) == 26

def test_get_podcasts(client):
    rv = client.get('/api/python/podcasts')
    json_data = rv.get_json()
    assert len(json_data['podcasts']) == 100

def test_get_reviews(client):
    rv = client.get('/api/python/reviews')
    json_data = rv.get_json()
    assert len(json_data['reviews']) == 100

def test_get_runs(client):
    rv = client.get('/api/python/runs')
    json_data = rv.get_json()
    assert len(json_data['runs']) == 8

def test_post_full_cat_pred(client):
    rv = client.post('/api/python/full-category-predict', json = { 'input': 'Bank system, credit card, valuta'})
    json_data = rv.get_json()
    assert json_data['output'] == 'business'

def test_post_partial_cat_pred_train(client):
    rv = client.post('/api/python/partial-category-predict/train', json = { 'categories': 'technology arts-food'})
    json_data = rv.get_json()
    assert json_data['output'] == 'Model Trained'

def test_post_partial_cat_pred_pred(client):
    rv = client.post('/api/python/partial-category-predict/predict', json = { 'input': 'big data, programming, computer, laptop' })
    json_data = rv.get_json()
    assert json_data['output'] == 'technology'

def test_post_sentiment_analysis(client):
    rv = client.post('/api/python/sentiment-analysis', json = { 'input': 'Good podcast, worth listening! Nice people, many laughs, informative content.' })
    json_data = rv.get_json()
    assert json_data['output'] == 'Positive'

def test_post_filter(client):
    rv = client.post('/api/python/filter', json = { 'input': 'Walmart' })
    json_data = rv.get_json()
    assert len(json_data['output']) == 1

def test_post_search(client):
    rv = client.post('/api/python/search', json = { 'input': 'Scaling Global' })
    json_data = rv.get_json()
    assert json_data['output'][0][4] == 'Scaling Global'

def test_post_search_categories(client):
    rv = client.post('/api/python/search/categories', json = { 'input': 'a00018b54eb342567c94dacfb2a3e504' })
    json_data = rv.get_json()
    assert json_data['output'][0][0] == 'business'

def test_post_search_reviews(client):
    rv = client.post('/api/python/search/reviews', json = { 'input': 'a00018b54eb342567c94dacfb2a3e504' })
    json_data = rv.get_json()
    assert len(json_data['output']) == 1

def test_get_sum_categories(client):
    rv = client.get('/api/python/statistics/sum-categories')
    json_data = rv.get_json()
    assert len(json_data['statistics']) == 26
    
def test_get_sum_ratings(client):
    rv = client.get('/api/python/statistics/sum-ratings')
    json_data = rv.get_json()
    assert len(json_data['statistics']) == 5

def test_get_ratings_per_year(client):
    rv = client.get('/api/python/statistics/ratings-per-year')
    json_data = rv.get_json()
    assert len(json_data['statistics']) == 17

def test_get_best_categories(client):
    rv = client.get('/api/python/statistics/best-categories')
    json_data = rv.get_json()
    assert len(json_data['statistics']) == 26