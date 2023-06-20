import { Injectable, OnInit } from '@angular/core';
import { Courses } from '../model/courses';

//import do HTTP client  - injeção de dependencia
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Courses[]>(this.API).pipe(
      first(),
      delay(1000),
      tap((courses) => console.log(courses))
    );
  }


  save(record: Courses){
   return this.httpClient.post<Courses>(this.API, record);
  }
}
