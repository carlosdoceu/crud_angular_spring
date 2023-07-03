import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';

import { Course } from '../model/courses';

//import do HTTP client  - injeção de dependencia
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {

  }

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(1000),
      tap((courses) => console.log(courses))
    );
  }

//No Ts salvando como Partial pois estamos passando tudo para o servidor
//pois não é necessariamente passar tudo, dizemos que passamos somente o necessario
  save(record: Partial<Course>){
   return this.httpClient.post<Course>(this.API, record);
  }
}
