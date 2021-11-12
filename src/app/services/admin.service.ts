import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly URL_API = 'http://localhost:3000/admin';

  constructor(private http:HttpClient) { 
  }

  public esAdministrador: boolean = false;

  getEsAdministrador(){
    return new Promise((resolve) => {
      if (this.esAdministrador){
        resolve(true);
      }

      const claveAdmin = localStorage.getItem("claveAdministrador");
      console.log(claveAdmin);
      if (!claveAdmin || !claveAdmin.trim().length){
        this.logOutAdministrador();
        resolve (false);
      }
      const claveAdmin2 = claveAdmin as string;
      this.consultarPorId(claveAdmin2)
      .subscribe((resp: any) => {
        console.log(resp);
        let existenDatos =(resp && resp.length);
        this.esAdministrador = existenDatos;
        resolve(existenDatos);
      }, (err: any) => {
        console.log(err);
        resolve(false);
      })
  
    } )
  }



  setClaveAdministrador(clave: string){
    this.esAdministrador = false;
    localStorage.setItem("claveAdministrador", clave);
  }

  logOutAdministrador(){
    this.esAdministrador = false;
    localStorage.removeItem("claveAdministrador");
  }

  consultarPorId(password: string){
    return this.http.get(this.URL_API +`/consultarPorId/${password}`);
  }


  actualizar(passwordAntiguo: string, passwordNuevo: string){
    return this.http.get(this.URL_API +`/actualizar/${passwordAntiguo}/${passwordNuevo}`);
  }
}
