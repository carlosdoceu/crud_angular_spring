import { Courses } from './../model/courses';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})

export class CoursesComponent implements OnInit {
  courses$: Observable <Courses[]>;
  displayedColumns=['name','category'];


  // CoursesService: CoursesService;


  constructor(private CoursesService: CoursesService) {
    //this.courses = [];
    // this.CoursesService = new CoursesService();
    this.courses$ = this.CoursesService.list()
    .pipe(
      catchError( error =>{
        console.log(error);
        return of([])
      })

    );


  }
  ngOnInit(): void {}
}
