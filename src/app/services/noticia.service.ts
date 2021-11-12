import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  selectedNoticia!: Noticia;
  noticias!: Noticia[];
  readonly URL_API = 'http://localhost:3000/noticia';


  constructor(private http:HttpClient) { 
    this.selectedNoticia = new Noticia();
  }

  getNoticias(){
    return this.http.get(this.URL_API);
  }

  obtenerUltimasNoticias(){
    return this.http.get(this.URL_API+`/listarUltimasNoticias`);
  }

  agregarNoticia(Noticia: Noticia){
    return this.http.post(this.URL_API, Noticia);
  }

  actualizarNoticia(noticia:Noticia){
    return this.http.put(this.URL_API + `/${noticia._id}`, noticia);
  }

  eliminarNoticia(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
