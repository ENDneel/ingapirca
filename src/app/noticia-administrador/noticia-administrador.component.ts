import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Noticia } from '../models/noticia';
import { NoticiaService } from '../services/noticia.service';

@Component({
  selector: 'app-noticia-administrador',
  templateUrl: './noticia-administrador.component.html',
  styleUrls: ['./noticia-administrador.component.scss']
})
export class NoticiaAdministradorComponent implements OnInit {

  constructor(public noticiaService:NoticiaService) { }

  ngOnInit(): void {
  }

  addNoticia(form?: NgForm) {
    this.noticiaService.agregarNoticia(form?.value)
      .subscribe(res => {
        this.resetForm(form);
        console.log(res);
      });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.noticiaService.selectedNoticia = new Noticia();
    }
  }

}
