import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonPodcastService {

  constructor(private http: HttpClient) { }

  // ***** Home *****
  // Get BG Color Shade
  getBGColorShade(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/bg-color-shade');
  }
  // Set BG Color Shade
  setBGColorShade(shade: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/bg-color-shade', JSON.parse(shade));
  }


  // ***** Tables *****
  // Get Categories Table
  getCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/categories');
  }

  // Get Podcasts Table
  getPodcasts(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/podcasts');
  }

  // Get Reviews Table
  getReviews(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/reviews');
  }

  // Get Runs Table
  getRuns(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/runs');
  }


  // ***** Predictive Analytics *****
  // Full Category Prediction
  fullCategoryPredict(input: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/full-category-predict', JSON.parse(input));
  }

  // Partial Category Prediction - Train
  trainModel(categories: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/partial-category-predict/train', JSON.parse(categories));
  }

  // Partial Category Prediction - Predict
  partialCategoryPredict(input: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/partial-category-predict/predict', JSON.parse(input));
  }

  // Sentiment Analysis
  sentimentAnalysis(input: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/sentiment-analysis', JSON.parse(input));
  }


  // ***** Data Visualization - Search Podcast *****
  // Filter Podcasts By Title
  filter(input: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/filter', JSON.parse(input));
  }

  // Search Podcasts By Title
  search(input: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/search', JSON.parse(input));
  }

  // Search Categories
  searchCategories(input: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/search/categories', JSON.parse(input));
  }

  // Search Reviews
  searchReviews(input: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/search/reviews', JSON.parse(input));
  }


  // ***** Data Visualization - Statistics *****
  // Sum Categories
  getSumCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/statistics/sum-categories');
  }

  // Sum Ratings
  getSumRatings(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/statistics/sum-ratings');
  }

  // Avg Ratings per Year
  getRatingsPerYear(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/statistics/ratings-per-year');
  }

  // Best Categories
  getBestCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/statistics/best-categories');
  }

}
