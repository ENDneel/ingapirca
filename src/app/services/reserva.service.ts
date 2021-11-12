import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  selectedReserva!: Reserva;
  reservaUltima!: Reserva[];
  readonly URL_API = 'http://localhost:3000/reserva';

  constructor(private http: HttpClient) {
    this.selectedReserva = new Reserva();
  }

  obtenerReservas() {
    return this.http.get(this.URL_API + '/listar');
  }

  recuperarUltimaReserva() {
    return this.http.get(this.URL_API + '/listarUltimo');
  }

  agregarReserva(Reserva: Reserva) {
    return this.http.post(this.URL_API, Reserva);
  }

  crearReservaPorLista(reservas: Reserva[]) {
    return this.http.post(this.URL_API + '/crearReservaPorLista', reservas);
  }

  confirmarReserva(reserva: Reserva) {
    return this.http.put(this.URL_API + `/${reserva._id}`, reserva);
  }

  deleteReserva(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
