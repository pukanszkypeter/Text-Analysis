import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Runs} from '../data/Run';


@Injectable({
  providedIn: 'root'
})
export class SapPodcastService {

  constructor(private http: HttpClient) { }
  // List Table -> Runs
  listRuns(): Observable<Runs[]> {
    return this.http.get<Runs[]>('http://localhost:4200/api/sap/podcast/runs')
      .pipe(
        map(res =>  {
          const answer: any = res;
          return answer.value.map(run => new Runs().initialize(run)); })
      );
  }
}
