import { CoursesService } from '../../services/courses.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/courses';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
//quando a relacionamento entre  componente filho e componente pai
//de courses list para courses component
  @Input() courses: Course[] = [];
  //eventEmiter emissor de eventos
  //false pois n temos nada pra passar e não temos nada asincrono
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  //readonly sera utilizado para como objeto final, sem sofrer alteração
  readonly displayedColumns = ['name', 'category', 'actions'];


  constructor(
    private CoursesService: CoursesService,

  ) {

  }


  adicionarCurso() {
    // console.log("onAdd");
    //diz a rota, usa rota relativa caso mudança em nome da rota usando relativeTo 'route' possui a rota anterior
    // this.router.navigate(['new'], { relativeTo: this.route });
    this.add.emit(true);

  }

  editarCurso(course: Course) {
    this.edit.emit(course);
  }

  deletarCurso(course: Course) {
    // console.log('botao deletar');
    this.delete.emit(course);
  }



}
