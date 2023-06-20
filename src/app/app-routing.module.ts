import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';





/*Lazy load carregamento por demanda
carrega todas as rotas que estiverem dentro de courses.module
*/
const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'courses'},
  {path: 'courses',loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
