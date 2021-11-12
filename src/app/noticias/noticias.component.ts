import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Noticia } from '../models/noticia';
import { AdminService } from '../services/admin.service';
import { NoticiaService } from '../services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  providers: [NoticiaService],
})
export class NoticiasComponent implements OnInit {

  constructor(public noticiaService: NoticiaService, private chRef: ChangeDetectorRef, private adminService: AdminService, private router: Router) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  titulo: any;
  link: any;
  cuerpo: any;

  ngOnInit(): void {
    this.adminService.getEsAdministrador()
      .then((resp: any) => {
        console.log(resp);
        if (resp) {
          this.iniciarNoticias();
          this.chRef.detectChanges();
        } else {
          this.router.navigateByUrl("/");
        }
      });
  }

  iniciarNoticias() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    };
    this.noticiaService.getNoticias()
      .subscribe(res => {
        this.data = (res as Noticia[]);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        this.chRef.detectChanges();
      });
  }

  addNoticia(form?: NgForm) {
    if (!this.validarDatos()) {
      return;
    }
    if (form?.value._id) {
      this.noticiaService.actualizarNoticia(form.value)
        .subscribe(res => {
          this.noticiaService.getNoticias()
            .subscribe(res => {
              window.alert('Noticia actualizada correctamente')
              this.data = (res as Noticia[]);
              this.chRef.detectChanges();
            });

          this.resetForm(form);
          console.log(res);
        })
    } else {
      if (!this.validarDatos()) {
        return;
      }
      this.noticiaService.agregarNoticia(form?.value)
        .subscribe(res => {
          this.noticiaService.getNoticias()
            .subscribe(res => {
              window.alert('Noticia creada correctamente')
              this.data = (res as Noticia[]);
              this.chRef.detectChanges();
            });

          this.resetForm(form);
          console.log(res);
        });
    }
  }

  actualizarNoticia(noticia: Noticia) {
    this.noticiaService.selectedNoticia = noticia;
    this.chRef.detectChanges();
    //this.noticiaService.actualizarNoticia(noticia)
  }

  validarDatos() {
    if (!this.titulo) {
      window.alert("Ingrese el titulo de la noticia")
      return;
    }
    if (!this.link) {
      window.alert("Ingrese el link de la noticia")
      return;
    }
    if (!this.cuerpo) {
      window.alert("Ingrese el cuerpo de la noticia")
      return;
    }
    return true;
  } 

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.noticiaService.selectedNoticia = new Noticia();
    }
  }
}