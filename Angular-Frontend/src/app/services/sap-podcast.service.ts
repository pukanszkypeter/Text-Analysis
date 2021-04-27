import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Run} from '../data/Run';


@Injectable({
  providedIn: 'root'
})
export class SapPodcastService {

  constructor(private http: HttpClient) { }
  // Get Linguistic Table
  getLinguisticTable(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/linguistic_full');
  }
  // Get Linguistic Types
  getLinguisticTypes(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/linguistic_full_types');
  }
  // Get Linguistic Data
  getLinguisticData(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/linguistic_full_data');
  }
  // Get Extraction Table
  getExtractionTable(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/extraction_core_voc');
  }
  // Get Extraction Types
  getExtractionTypes(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/extraction_core_voc_types');
  }
  // Get Extraction Data
  getExtractionData(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/extraction_core_voc_data');
  }
  // Get Positive Words
  getPositiveWords(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/positive_words');
  }
  // Get Negative Words
  getNegativeWords(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/negative_words');
  }
  // Get Common Words
  getCommonWords(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/common_words');
  }
  // Get Common Words
  getRarestWords(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/sap/sap-backend/rarest_words');
  }
}
