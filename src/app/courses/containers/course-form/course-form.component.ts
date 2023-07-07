import { LocalizedString } from '@angular/compiler';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services/courses.service';

import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Course } from '../../model/courses';

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
    _id: [''],
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
    private route: ActivatedRoute
  ) {
    // this.form =
  }
  /**
   ja pssou pele nosso resolver, tudo oq temos q fazer é puxar os dados de la
   */
  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
  }

  adicionarCurso() {
    // this.router.navigate([''], { relativeTo: this.route});
    //chama save do serviço para consumir a API
    this.service.save(this.form.value).subscribe({
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
