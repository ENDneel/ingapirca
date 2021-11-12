import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  iFrameUrl!: SafeResourceUrl;
  displayFrame =false;

  constructor (private sanitizer: DomSanitizer){

  }
  
  ngOnInit(): void {
    this.onOpenEntrada();
  }

  onOpenEntrada(): void {
    //debugger;
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:5522/Juego/index.html");
    this.displayFrame= true;
  }

}
