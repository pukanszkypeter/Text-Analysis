import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonPodcastService {

  constructor(private http: HttpClient) { }

  // Get Podcast Categories
  getCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/python/categories');
  }

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

}
