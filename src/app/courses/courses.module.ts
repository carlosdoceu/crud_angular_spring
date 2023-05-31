import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';

import { AngularMaterialModule } from '../shared/angular-material.module.ts/angular-material.module';
@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AngularMaterialModule,
    
  ]
})
export class CoursesModule { }
