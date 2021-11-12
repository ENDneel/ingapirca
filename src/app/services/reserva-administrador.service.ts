import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservaAdministrador } from '../models/reserva-administrador';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReservaAdministradorService {

  selectedReservaAdministrador!: ReservaAdministrador;
  //Arreglo de reservas
  reservaAdministrador!: ReservaAdministrador[];
  readonly URL_API = 'http://localhost:3000/reservaAdministrador';

  constructor(private http: HttpClient) {
    this.selectedReservaAdministrador = new ReservaAdministrador();
  }

  getReservasAdministrador() {
    return this.http.get(this.URL_API);
  }

  agregarReservaAdministrador(ReservaAdministrador: ReservaAdministrador) {
    return this.http.post(this.URL_API, ReservaAdministrador);
  }

  agregarPorListaReservaAdministrador(listaReservas: ReservaAdministrador[]) {
    return this.http.post(this.URL_API + '/crearPorLista', listaReservas);
  }

  recuperarFechasReservadasDespuesFecha(fechaInicio: any) {
    return this.http.get(this.URL_API + `/recuperarFechasReservadas/${fechaInicio}`);
  }

  recuperarFechasReservaCuposDisponibles(fechaInicio: any) {
    return this.http.get(this.URL_API + `/recuperarFechasReservaCuposDisponibles/${fechaInicio}`);
  }

  recuperarHorariosDisponiblesPorFecha(fecha: any) {
    return this.http.get<ReservaAdministrador[]>(this.URL_API + `/recuperarHorariosDisponibles/${fecha}`);
  }

  actualizarReservaAdministrador(reservaAdministrador: ReservaAdministrador) {
    return this.http.put(this.URL_API + `/${reservaAdministrador._id}`, reservaAdministrador);
  }

  eliminarReservaAdministrador(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`)
  }
}