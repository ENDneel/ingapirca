import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Noticia } from '../models/noticia';
import { NoticiaService } from '../services/noticia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NoticiaService]
})
export class HomeComponent implements OnInit {


  constructor(public noticiaService:NoticiaService, private chRef: ChangeDetectorRef) { }

  listadoNoticias: any[] = [];
  recientes: any[] = [];

  ngOnInit(): void {
    this.ultimasNoticias();
  }
  
  ultimasNoticias(){
    this.noticiaService.obtenerUltimasNoticias()
    .subscribe(res => {
      this.listadoNoticias = res as Noticia[];
      this.chRef.detectChanges();
      this.mostrarNoticias();
    });
  }

  mostrarNoticias(){
    for (let i = 0; i < 3; i++) {
      this.recientes.push(this.listadoNoticias[i]);
    }
    console.log(this.recientes,'recientes')
  }

  imageObject = [{
    image: '/assets/img/Inicio/1.jpg',
    thumbImage: '/assets/img/Inicio/1.jpg',
    title: 'Templo del Sol'
  }, {
    image: '/assets/img/Inicio/2.jpg',
    thumbImage: '/assets/img/Inicio/2.jpg',
    title: 'Dinteles y Sillares'
  }, {
    image: '/assets/img/Inicio/3.jpg',
    thumbImage: '/assets/img/Inicio/3.jpg',
    title: 'Fauna del lugar'
  }, {
    image: '/assets/img/Inicio/4.jpg',
    thumbImage: '/assets/img/Inicio/4.jpg',
    title: 'Terrazas de uso agrícola'
  }, {
    image: '/assets/img/Inicio/5.jpg',
    thumbImage: '/assets/img/Inicio/5.jpg',
    title: 'Galería'
  }, {
    image: '/assets/img/Inicio/6.jpg',
    thumbImage: '/assets/img/Inicio/6.jpg',
    title: 'Tumba Cañari'
  }, {
    image: '/assets/img/Inicio/7.jpg',
    thumbImage: '/assets/img/Inicio/7.jpg',
    title: 'Granos y Vestimenta'
  }, {
    image: '/assets/img/Inicio/8.jpg',
    thumbImage: '/assets/img/Inicio/8.jpg',
    title: 'Cara del Inca'
  }, {
    image: '/assets/img/Inicio/9.jpg',
    thumbImage: '/assets/img/Inicio/9.jpg',
    title: 'Panorámica del Complejo'
  }
  ];
}