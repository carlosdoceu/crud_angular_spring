import { LocalizedString } from '@angular/compiler';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from './../services/courses.service';

// import { Route } from '@angular/router';
// import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {
    this.form = formBuilder.group({
      name: [null],
      category: [null],
      salvarCurso: [null],
    });
  }

  adicionarCurso() {
    // this.router.navigate([''], { relativeTo: this.route});
    //chama save do serviço para consumir a API
    this.service.save(this.form.value).subscribe({
      next:(result)=> this.onSucess,
      error: () => {
        this.onError();
      },
    });
  }

  cancelarAdicao() {
    this.location.back();
  }


  private onError(){
      this.snackBar.open("Aconteceu um erro ao Salvar", "", {duration:5000});
  }

  private onSucess(){
    this.snackBar.open("Salvo", "", {duration:5000});

  }
}
