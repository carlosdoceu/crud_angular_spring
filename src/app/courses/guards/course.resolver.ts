import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../model/courses';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root'
})

 /*
 guarda de rotas, comunicação dados tanto front quanto back

 */
export class CourseResolver implements Resolve<Course> {

  constructor(private service: CoursesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    /**
     * se existe parametros com id, busca esse objeto com esse id
     */
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    //por ser um observable de curso

    return of({ _id: '', name: '', category: '', lessons: [] });
  }
}
