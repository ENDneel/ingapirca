import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NoticiaService } from '../services/noticia.service';
import { Noticia } from '../models/noticia';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
  providers: [NoticiaService],
})
export class NoticiaComponent implements OnInit {

  constructor(public noticiaService:NoticiaService, private chRef: ChangeDetectorRef) { }

  fechaPublicacion: string = "";
  fechas: any[] = [];
  noticias: { titulo: string, cuerpo: string, link: string, fecha: string }[] = [];

  ngOnInit(): void {
    this.getNoticia();
  }

  getNoticia() {
    this.noticias = [];
    this.noticiaService.getNoticias()
      .subscribe(res => {
        this.noticiaService.noticias = res as Noticia[];
        for(let newNoticias of this.noticiaService.noticias){
          this.noticias.push({titulo:newNoticias.titulo, cuerpo:newNoticias.cuerpo, link:newNoticias.link, fecha:((newNoticias.fecha).toString()).substring(0,10)})
          //this.horarios.push({ horario: horarioInicial.format('HH:mm'), marcado: false });
          //this.fechas.push(((fecha.fecha).toString()).substring(0,10));
          //console.log(this.fechas);
        }
        //this.fechaAsignada = (((this.reservaService.selectedReserva.fecha).toString())).substring(0,10);  
        console.log(res)
        this.chRef.detectChanges();
      }, err => {
        console.log(err);
      });
  }
}