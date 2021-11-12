import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.component.html',
  styleUrls: ['./recorrido.component.scss']
})
export class RecorridoComponent implements OnInit {

  iFrameUrl!: SafeResourceUrl;
  displayFrame =false;

  constructor (private sanitizer: DomSanitizer){

  }
  
  ngOnInit(): void {
    this.onOpenEntrada();
  }

  onOpenEntrada(): void {
    //debugger;
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:5522/Recorrido/Recorrido/Recorrido1.html");
    this.displayFrame= true;
  }

}