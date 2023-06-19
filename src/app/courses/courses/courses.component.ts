import { Courses } from './../model/courses';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})

export class CoursesComponent implements OnInit {
  courses$: Observable <Courses[]>;
  displayedColumns=['name','category'];


  // CoursesService: CoursesService;


  constructor(
    private CoursesService: CoursesService,
    public dialog : MatDialog,
    ) {
    //this.courses = [];
    // this.CoursesService = new CoursesService();
    this.courses$ = this.CoursesService.list()
    .pipe(
      catchError( error =>{
        this.onError("Erro no carregamento da Pagína");
        console.log(error);
        return of([])
      })

    );




  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {}
}
