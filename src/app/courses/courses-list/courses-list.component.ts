import { CoursesService } from './../services/courses.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Courses } from '../model/courses';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
//quando a relacionamento entre  componente filho e componente pai
//de courses list para courses component
  @Input() courses: Courses[] = [];
  //eventEmiter emissor de eventos
  @Output() add = new EventEmitter(false);

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

  editarCurso() {
    console.log('botao editar');
  }

  deletarCurso() {
    console.log('botao deletar');
  }



}
