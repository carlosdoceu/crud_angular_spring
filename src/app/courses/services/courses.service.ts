import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../model/courses';

//chave q servira para refresh da page | persistencia
const CHAVE_ACCESS_TOKEN = 'auth';

//import do HTTP client  - injeção de dependencia
@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';
  private sessao = new BehaviorSubject<Course | null>(null);

  constructor(private httpClient: HttpClient) {
    /*Quando usuario der refresh na pagina, vai recriar o construtor e resgatar sessão|persistencia*/
    this.restaurarSessao();
  }
  /*Inicio Persistencia login */
  restaurarSessao() {
    const jsonSessao = sessionStorage.getItem(CHAVE_ACCESS_TOKEN);

    if (!jsonSessao) {
      return;
    }

    const dadosSessao: Course = JSON.parse(jsonSessao);
    this.sessao.next(dadosSessao);
  }

  salvarSessao(dadosSessao: Course) {
    sessionStorage.setItem(CHAVE_ACCESS_TOKEN, JSON.stringify(dadosSessao));
    /**
     * Vai disparar um valor para quem esta ouvindo o observable, retornado pelo metodo getSessao
     */
    this.sessao.next(dadosSessao);
  }

  limparSessao() {
    sessionStorage.clear();
    this.sessao.next(null);
  }

  getSessao() {
    return this.sessao.asObservable();
  }

  estaLogado() {
    return this.sessao.value !== null;
  }

/*Fim Persistencia login */
  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(1000),
      tap((courses) => console.log(courses))
    );
  }

  //No Ts salvando como Partial pois estamos passando tudo para o servidor
  //pois não é necessariamente passar tudo, dizemos que passamos somente o necessario
  save(record: Partial<Course>) {
    /*verifica se é um create ou um update baseado no que ele retorna, se tiver um id é update se tiver n é um create*/
    if (record._id) {
      console.log('update');
      return this.update(record);
    } else {
      console.log('Create');
      return this.create(record);
    }
  }

  //comunica id com back pelo guarda de rotas'
  loadById(id: String) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }



  remove(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }


  private create(record: Partial<Course>) {
    return this
    .httpClient.post<Course>(this.API, record)
    .pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient
      .put<Course>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }





}
