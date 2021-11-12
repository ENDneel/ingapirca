import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { ReservaService } from '../services/reserva.service';
import { ReservaAdministradorService } from '../services/reserva-administrador.service';
import { NbToastrService } from '@nebular/theme';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { ReservaAdministrador } from '../models/reserva-administrador';
import { Reserva } from '../models/reserva';
import { Respuesta } from '../models/response';
import { FechaDisponible } from '../models/dto/fechaDisponible';
import { Evento } from '../models/dto/evento';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
  providers: [ReservaAdministradorService, ReservaService],
})
export class ReservaComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;


  constructor(public reservaAdministradorService: ReservaAdministradorService, public reservaService: ReservaService,
    private toastrService: NbToastrService, private chRef: ChangeDetectorRef) { }

  lstFechasReservadasStr: string[] = [];
  lstHorariosDisponibles: string[] = [];
  horarios: { idReservaAdministrador: string, horario: string, cantidad: number, disponibles: number, cantidadReservada: number, marcado: boolean }[] = [];
  events: Evento[] = [];
  calendarOptions!: CalendarOptions;

  mostrarHorariosFecha: boolean = false;
  mostrarReserva: boolean = false;
  fechaSeleccionada: string = "";
  fechaAsignada: string = "";

  horarioSeleccionado: string = "";

  inputNombre!: string;
  inputTelefonoContacto!: string;
  ultimaReserva !: [];
  messages: any[] = [];


  ngOnInit(): void {
    this.recuperarFechasInicio();
    //this.listarUltimo();
  }

  recuperarFechasInicio() {
    let fecha = new Date();
    let fechStr = moment(fecha).format("YYYY-MM-DD");
    this.reservaAdministradorService.recuperarFechasReservaCuposDisponibles(fechStr)
      .subscribe(rep => {
        this.inicializarHorario(rep as FechaDisponible[]);
        console.log('fecha', rep);
      }, err => console.log(err));
  }


  inicializarHorario(fechasReservadas: FechaDisponible[]) {
    this.lstFechasReservadasStr = [];
    if (fechasReservadas && fechasReservadas.length) {
      for (let fechaReserva of fechasReservadas) {
        this.lstFechasReservadasStr.push(fechaReserva.dia);
        let colorEvento = (fechaReserva.existeDisponible) ? "green" : "red";
        let grupoId = fechaReserva.existeDisponible ? "existeDisponible" : "";
        let eventoDia = { id: fechaReserva.dia, title: "", date: fechaReserva.dia, allDay: true, color: colorEvento, display: "background", groupId: grupoId };
        this.events.push(eventoDia)
      }
    }
    console.log(this.events);
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      eventClick: this.handleEventClick.bind(this),
      locale: esLocale,
      events: this.events,
      navLinks: true,
      navLinkDayClick: (date, jsEvent) => {
        console.log(date, jsEvent);
        this.handleEventClickDate(date);
      },
    };
    setTimeout(() => window.scroll(10, 0), 1200);
    this.chRef.detectChanges();
    this.addListenerToDays();
  }

  handleEventClickDate(fecha: Date) {
    this.mostrarHorariosFecha = false;
    let fechaInputStr = moment(fecha).format('YYYY-MM-DD');

    let lstEventosDia: Evento[] = this.events.filter(event => event.date == fechaInputStr);
    console.log(lstEventosDia);

    if (!lstEventosDia || !lstEventosDia.length ){
      window.alert('No hay cupos disponibles en el día seleccionado');
      //this.toastrService.show('ADVERTENCIA', "No hay cupos disponibles en el día seleccionado", { preventDuplicates: true });
      this.chRef.detectChanges();
      return;
    }

    let esDiaNoDisponible = lstEventosDia.some(evento => !evento.groupId);
    
    if (esDiaNoDisponible){
      window.alert('No hay cupos disponibles en el día seleccionado');
      //this.toastrService.show('ADVERTENCIA', "No hay cupos disponibles en el día seleccionado", { preventDuplicates: true });
      this.chRef.detectChanges();
      return;
    }

    this.fechaSeleccionada = moment(fecha).format('YYYY-MM-DD');
    this.mostrarHorariosFecha = true;
    this.recuperarHorarioPorFecha();
    this.chRef.detectChanges();
  }

  handleEventClick(event: any) {
    this.mostrarHorariosFecha = false;
    if (!event.event.groupId) {
      window.alert('No hay cupos disponibles en el día seleccionado');
      //this.toastrService.show('ADVERTENCIA', "No hay cupos disponibles en el día seleccionado", { preventDuplicates: true });
      this.chRef.detectChanges();
      return;
    }

    let fecha = new Date(event.event.start);
    this.fechaSeleccionada = moment(fecha).format('YYYY-MM-DD');
    this.mostrarHorariosFecha = true;
    this.recuperarHorarioPorFecha();
    this.chRef.detectChanges();
  }


  addListenerToDays() {
    let lstDays: any = document.getElementsByClassName("fc-daygrid-day-number");
    for (let index = 0; index < lstDays.length; index++) {
      let input = lstDays.item(index);
       input.addEventListener("keyup", function(event: any) {
        if (event.keyCode === 13) {
          input.click();
        }
      });
    }
  }

  recuperarHorarioPorFecha() {
    this.horarios = [];
    this.reservaAdministradorService.recuperarHorariosDisponiblesPorFecha(this.fechaSeleccionada)
    
      .subscribe(rep => {
        this.agregarHorarios(rep);
      }, err => console.log(err));

    console.log("disponibles",this.horarios)
  }

  agregarHorarios(reAdmin: ReservaAdministrador[]) {
    this.horarios = [];
    for (let re of reAdmin) {
      this.horarios.push(
        {
          idReservaAdministrador: re._id,
          horario: re.horario,
          cantidad: re.cantidad,
          disponibles: re.cantidad - re.ocupados,
          cantidadReservada: 1,
          marcado: false
        });
    }
    this.chRef.detectChanges();
  }

  generarReserva() {
    if (!this.validarReservados()) {
      return;
    }
    this.mostrarHorariosFecha = false;
    let reservas = this.generarReservasAGuardar();
    this.reservaService.crearReservaPorLista(reservas).subscribe(res => {
      let response = res as Respuesta;
      window.alert(response.mensaje);
      //this.toastrService.show('ADVERTENCIA', response.mensaje, { preventDuplicates: true });
      if (!response || response.code != 'OK') {
        this.resetTodo();
        this.mostrarReserva = true;
        this.listarUltimo();
      }
      this.recuperarHorarioPorFecha();
      this.chRef.detectChanges();
    });

  }

  listarUltimo() {
    this.mostrarHorariosFecha = false;
    this.reservaService.recuperarUltimaReserva()
      .subscribe(res => {
        this.reservaService.selectedReserva = res as Reserva;
        this.fechaAsignada = (((this.reservaService.selectedReserva.fecha).toString())).substring(0,10);  
        console.log(res)
      });
  }


  resetTodo() {
    this.inputNombre = "";
    this.inputTelefonoContacto = "";
    this.mostrarHorariosFecha = false;
  }

  recargar(){
    setTimeout(function () {
      // Do something after 5 seconds
      location.reload();//reload page
    }, 500);
  }

  generarReservasAGuardar() {
    let reservas: Reserva[] = [];
    let horariosMarcados = this.horarios.filter(ho => ho.marcado);
    for (let horario of horariosMarcados) {
      let reservatmp = new Reserva();
      reservatmp.nombre = this.inputNombre;
      reservatmp.telefono = this.inputTelefonoContacto;
      reservatmp.cantidad = horario.cantidadReservada;
      reservatmp.fecha = new Date(this.fechaSeleccionada);
      reservatmp.horario = horario.horario;
      reservatmp.idReservaAdministrador = horario.idReservaAdministrador;
      reservatmp.fechaCreacion = new Date();
      reservatmp.confirmado = "no";
      reservas.push(reservatmp);
    }
    return reservas;
  }

  validarReservados() {
    console.log("Reservando");
    if (!this.horarios || !this.horarios.length) {
      window.alert('No existen horarios para guardar');
      //this.toastrService.show('ADVERTENCIA', "No existen horarios para guardar", { preventDuplicates: true });
      return;
    }
    let horariosMarcados = this.horarios.filter(ho => ho.marcado);
    if (!horariosMarcados || !horariosMarcados.length) {
      window.alert('Seleccione un horario para guardar');
      //this.toastrService.show('ADVERTENCIA', "Seleccione un horario para guardar", { preventDuplicates: true });
      return;
    }

    let reservasIncorrectas = horariosMarcados.filter(ho => ho.cantidadReservada > ho.disponibles || ho.cantidadReservada < 1);
    if (reservasIncorrectas && reservasIncorrectas.length) {
      window.alert('Verifique que las reservas sean mayor a 1 y menor a la cantidad disponible de cupos');
      //this.toastrService.show('ADVERTENCIA', "Verifique que las reservas sean mayor a 1 y menor a la cantidad disponible de cupos", { preventDuplicates: true });
      return;
    }

    if (!this.inputNombre || !this.inputNombre.length) {
      window.alert('Ingrese el nombre de la persona que realiza la reserva');
      //this.toastrService.show('ADVERTENCIA', "Ingrese el nombre de la persona que realiza la reserva", { preventDuplicates: true });
      return;
    }

    if (!this.inputTelefonoContacto || !this.inputTelefonoContacto.length) {
      window.alert('Ingrese un teléfono de contacto');
      //this.toastrService.show('ADVERTENCIA', "Ingrese un teléfono de contacto", { preventDuplicates: true });
      return;
    }

    return true;
  }

  toggleReserva (ho: any, evento: boolean) {
    if (evento && this.horarios && this.horarios.length > 1){
      let existeYaMarcado  = this.horarios.filter(htmp => htmp.marcado).length > 1;
      console.log(existeYaMarcado);
      if (existeYaMarcado){
        let horariosDiferentesAlMarcado = this.horarios.filter(htmp => htmp.horario != ho.horario);
        for (const horarioNoMarcar of horariosDiferentesAlMarcado) {
          horarioNoMarcar.marcado = false;
        }
        window.alert('Solo puede seleccionar un horario');
        //this.toastrService.show('ADVERTENCIA', "Solo puede seleccionar un horario", { preventDuplicates: true });
        this.chRef.detectChanges();
      }
    }
  }
}