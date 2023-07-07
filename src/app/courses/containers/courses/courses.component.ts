import { Course } from '../../model/courses';
import { CoursesService } from '../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;
  displayedColumns = ['name', 'category', 'actions'];

  // CoursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    //Router classe ja existente no angular, controla rotas
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    //this.courses = [];
    // this.CoursesService = new CoursesService();
    this.refresh();
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  adicionarCurso() {
    // console.log("onAdd");
    //diz a rota, usa rota relativa caso mudança em nome da rota usando relativeTo 'route' possui a rota anterior
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  editarCurso(course: Course) {
    // console.log('botao editar');
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro no carregamento da Pagína');
        console.log(error);
        return of([]);
      })
    );
  }

  deletarCurso(course: Course) {
    this.coursesService.remove(course._id).subscribe(
      () => {
        this.snackBar.open('Item removido', ' X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      () => this.onError('Erro ao tentar remover curso.')
    );
    this.refresh();
  }

  ngOnInit(): void {
    this.refresh();
  }
}
