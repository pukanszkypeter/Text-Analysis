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
  // Partial Cat. Pred. Model Train
  partialTrain(categories: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/partial-category-predict/train', JSON.parse(categories));
  }
  // Partial Category Prediction
  partialCategoryPredict(input: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/python/partial-category-predict/predict', JSON.parse(input));
  }
}
