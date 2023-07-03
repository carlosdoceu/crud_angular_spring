import { LocalizedString } from '@angular/compiler';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services/courses.service';

import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

// import { Route } from '@angular/router';
// import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  /**
   * form ja recebe formBuilder.group do constructor
   * tipando os valores do formulario
   */
  form = this.formBuilder.group({
    name: [''],
    category: [''],
    // salvarCurso: [null],
  });
  //NonNullableFormBuilder servira para que não exista campos nullos em um form
  //
  constructor(
    private formBuilder: NonNullableFormBuilder,
    // private router: Router,
    // private route: ActivatedRoute,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,

  ) {
    // this.form =
  }

  adicionarCurso() {
    // this.router.navigate([''], { relativeTo: this.route});
    //chama save do serviço para consumir a API
    this.service.save.(this.form.value).subscribe({
      next: () => this.onSucess(),
      error: () => {
        this.onError();
      },
    });
    this.cancelarAdicao();
  }

  cancelarAdicao() {
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Aconteceu um erro a Salvar', '', { duration: 5000 });
  }

  private onSucess() {
    this.snackBar.open('Salvo', '', { duration: 5000 });
  }
}
