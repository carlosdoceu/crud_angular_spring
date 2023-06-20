import { Courses } from './../model/courses';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})

export class CoursesComponent implements OnInit {
  courses$: Observable <Courses[]>;
  displayedColumns=['name','category','actions'];


  // CoursesService: CoursesService;


  constructor(
    private CoursesService: CoursesService,
    public dialog : MatDialog,
    //Router classe ja existente no angular, controla rotas
    private router: Router,
    private route: ActivatedRoute,


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


  adicionarCurso(){
    // console.log("onAdd");
    //diz a rota, usa rota relativa caso mudança em nome da rota usando relativeTo 'route' possui a rota anterior
    this.router.navigate(['new'], { relativeTo: this.route});

  }


  ngOnInit(): void {}
}
