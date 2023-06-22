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

//No Ts salvando como Partial pois estamos passando tudo para o servidor
//pois não é necessariamente passar tudo, dizemos que passamos somente o necessario
  save(record: Partial<Courses>){
   return this.httpClient.post<Courses>(this.API, record);
  }
}
