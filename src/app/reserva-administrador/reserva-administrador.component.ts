import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
//import { Reserva } from '../models/reserva';
//import { ReservaService } from '../services/reserva.service';
import { ReservaAdministradorService } from '../services/reserva-administrador.service';
import { ReservaAdministrador } from '../models/reserva-administrador';

import * as moment from 'moment';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { NbToastrService } from '@nebular/theme';
import { ReservaService } from '../services/reserva.service';
import { Subject } from 'rxjs';
import { Reserva } from '../models/reserva';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-reserva-administrador',
  templateUrl: './reserva-administrador.component.html',
  styleUrls: ['./reserva-administrador.component.scss'],
  providers: [ReservaAdministradorService, ReservaService],
})
export class ReservaAdministradorComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;

  constructor(public reservaAdministradorService: ReservaAdministradorService, private toastrService: NbToastrService,
     public reservaService: ReservaService, private chRef: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, 
     private adminService: AdminService) { }

  horarios: { horario: string, marcado: boolean }[] = [];
  horariosAsignados: any = [];
  fechaActual!: Date;
  inputHoraInicio!: Date;
  inputHoraInicioStr!: string;
  inputHoraFinStr!: string;


  inputHoraFin!: Date;
  intervaloTiempo: number = 30;
  cantidad: number = 16;
  btnGuardar!: any;
  eventosDelCalendario: any = [];

  reserva!: ReservaAdministrador;
  diasAsignados: any = [];
  events: { title: string, date: string }[] = [];

  lstFechasReservadasStr: string[] = [];

  calendarOptions!: CalendarOptions;

  mostrarPagina = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;

  ngOnInit(): void {
    let password = this.route.snapshot.paramMap.get('password');
    if (password) {
      this.adminService.setClaveAdministrador(password);
    }
    console.log("ingreso clave");

    this.adminService.getEsAdministrador()
    .then( (resp: any) => {
      console.log(resp);
      if (resp){
        this.iniciarReservaAdministrador();
      }else{
        this.router.navigateByUrl("/");
      }
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    };
  }

  iniciarReservaAdministrador(){
    this.mostrarPagina = true;
    this.chRef.detectChanges();
    this.fechaActual = new Date();
    this.fechaActual.setHours(0, 0, 0, 0);
    this.inputHoraInicioStr = "08:00";
    this.inputHoraFinStr = "17:00";


    this.inputHoraInicio = new Date();
    this.inputHoraInicio.setHours(8, 0, 0, 0);

    this.inputHoraFin = new Date();
    this.inputHoraFin.setHours(17, 0, 0, 0);

    this.recuperarFechasInicio();

    
    this.reservaService.obtenerReservas()
      .subscribe(res => {
        this.data = (res as Reserva[]);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        this.chRef.detectChanges();
      });
  }

  recuperarFechasInicio() {
    let fecha = new Date();
    fecha.setDate(1);
    let fechStr = moment(fecha).format("YYYY-MM-DD");
    this.reservaAdministradorService.recuperarFechasReservadasDespuesFecha(fechStr)
      .subscribe(rep => {
        this.inicializarHorario(rep as string[]);
      }, err => console.log(err));
  }

  handleDateClickDate(date: Date) {
    let fechStr = moment(date).format("YYYY-MM-DD");

    if (this.calendarComponent && this.fechaValida(fechStr)) {
      let calendarApi = this.calendarComponent.getApi();
      let eventoById = calendarApi.getEventById(fechStr);
      //Si ya existe evento en la fecha remueve la fecha
      if (eventoById) {
        eventoById.remove();
      } else {
        //Si no hay evento le agrega
        let eventoDia = { id: fechStr, title: "Seleccionado", date: fechStr, allDay: true, display: "block", color: "blue" };
        calendarApi.addEvent(eventoDia);
        window.alert('Dia seleccionado correctamente');
      }
      this.eventosDelCalendario = calendarApi.getEvents().filter(evento => !evento.groupId).map(evento => evento.start);
      console.log(this.eventosDelCalendario);
    }
  }

  handleDateClick(arg: { dateStr: string; }) {
    if (this.calendarComponent && this.fechaValida(arg.dateStr)) {
      let calendarApi = this.calendarComponent.getApi();
      let eventoById = calendarApi.getEventById(arg.dateStr);
      //Si ya existe evento en la fecha remueve la fecha
      if (eventoById) {
        eventoById.remove();
      } else {
        //Si no hay evento le agrega
        let eventoDia = { id: arg.dateStr, title: "Seleccionado", date: arg.dateStr, allDay: true, display: "block", color: "blue" };
        calendarApi.addEvent(eventoDia);
        window.alert('Dia seleccionado correctamente');
      }
      this.eventosDelCalendario = calendarApi.getEvents().filter(evento => !evento.groupId).map(evento => evento.start);
      console.log(this.eventosDelCalendario);
    }
  }

  handleEventClick(event: any) {
    console.log("hola click")
    let fecha = new Date(event.event.start);
    let fechaStr = moment(fecha).format('YYYY-MM-DD');
    if (this.calendarComponent && !event.event.groupId && this.fechaValida(fechaStr)) {
      let calendarApi = this.calendarComponent.getApi();
      let eventoById = calendarApi.getEventById(fechaStr);
      //Si ya existe evento en la fecha remueve la fecha
      if (eventoById) {
        eventoById.remove();
        this.eventosDelCalendario = calendarApi.getEvents().filter(evento => !evento.groupId).map(evento => evento.start);
        console.log(this.eventosDelCalendario);
      }
    }

  }

  fechaValida(fechaStr: string) {
    let resultado = true;
    let fechaEvento = new Date(fechaStr + 'T05:00:00.000Z');
    console.log(fechaEvento.getTime(), this.fechaActual.getTime())
    if (this.fechaActual.getTime() > fechaEvento.getTime()) {
      window.alert('La fecha seleccionada es anterior a la fecha actual');
      //(this.toastrService.info('ADVERTENCIA', "La fecha seleccionada es anterior a la fecha actual", { preventDuplicates: true }));
      console.log("La fecha seleccionada es anterior a la fecha actual");
      resultado = false;
    }
    if (resultado && this.lstFechasReservadasStr && this.lstFechasReservadasStr.includes(fechaStr)) {
      window.alert('La fecha seleccionada esta reservada');
      //this.toastrService.show('ADVERTENCIA', "La fecha seleccionada esta reservada", { preventDuplicates: true });
      console.log("La fecha seleccionada es reservada");
      resultado = false;
    }
    return resultado;
  }

  inicializarHorario(fechasReservadas: string[]) {
    this.lstFechasReservadasStr = [];
    if (fechasReservadas && fechasReservadas.length) {
      for (let fecha of fechasReservadas) {
        let date = new Date(fecha);
        let fechaStr = moment(date).format('YYYY-MM-DD');
        this.lstFechasReservadasStr.push(fechaStr);
        let eventoDia = { id: fechaStr, title: "", date: fechaStr, allDay: true, color: "red", backgroundColor: "red", display: "background", groupId: "reservado" };
        this.events.push(eventoDia)
      }
    }
    console.log(this.events);
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      // dateClick: this.handleDateClick.bind(this),
      navLinkDayClick: (date, jsEvent) => {
        console.log(date, jsEvent);
        this.handleDateClickDate(date);
      },
      eventClick: this.handleEventClick.bind(this),
      locale: esLocale,
      events: this.events,
      navLinks: true,
    };
    setTimeout(() => window.scroll(5, 5), 1200);
  }

  generarHorarios() {
    if (!this.validarDatos()) {
      return;
    }
    console.log("Hola");
    this.inputHoraInicio =  new Date("1970-01-01T"+this.inputHoraInicioStr);
    this.inputHoraFin = new Date("1970-01-01T"+this.inputHoraFinStr);
    console.log(this.inputHoraInicio, this.inputHoraFin);
    this.horarios = [];
    let horarioInicial = moment(this.inputHoraInicio, 'HH:mm')
    let horarioFinal = moment(this.inputHoraFin, 'HH:mm')
    let continuar = true;
    while (continuar) {
      if (horarioInicial > horarioFinal) {
        continuar = false;
      } else {
        this.horarios.push({ horario: horarioInicial.format('HH:mm'), marcado: false });
        horarioInicial = moment(horarioInicial).add(this.intervaloTiempo, 'minutes');
      }
    }
    console.log('Chao');
    console.log(this.horarios);
    console.log(this.intervaloTiempo);

    this.addListenerToDays();
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

  validarDatos() {
    if (!this.inputHoraInicio) {
      window.alert("Ingrese la hora de inicio")
      return;
    }

    if (!this.inputHoraFin) {
      window.alert("Ingrese la hora de fin")
      return;
    }

    if (this.inputHoraInicio >= this.inputHoraFin) {
      window.alert("La hora de inicio debe ser menor a la hora de fin")
      return;
    }

    if (!this.intervaloTiempo || this.intervaloTiempo < 0) {
      window.alert("Ingrese un intervalo de tiempo mayor a cero")
      return;
    }
    return true;
  }

  agregarHorarios() {
    this.horariosAsignados = [];
    console.log(this.horarios);
    let horariosAsignados = this.horarios.filter(horario => horario.marcado);
    console.log(horariosAsignados);
    this.horariosAsignados = horariosAsignados.map(h => h.horario);
    console.log('aja', this.horariosAsignados);
  }

  agregarDias() {
    this.diasAsignados = [];
    for (var i = 0; i < this.eventosDelCalendario.length; i++) {
      let fecha = new Date(this.eventosDelCalendario[i]);
      let nuevaFecha = moment(fecha).startOf('day');
      this.diasAsignados.push(nuevaFecha);
      console.log(this.diasAsignados);
    }
    console.log(this.diasAsignados);
  }

  agregarReserva() {
    this.agregarDias();
    this.agregarHorarios();
    this.btnGuardar = true;
    if (!this.validarDiasHorariosGuardar()) {
      return;
    }

    let aGuardar = [];
    for (let diaAsignado of this.diasAsignados) {
      for (let horario of this.horariosAsignados) {
        let reserva = new ReservaAdministrador(diaAsignado, horario, this.cantidad, 0);
        aGuardar.push(reserva);
      }
    }

    this.reservaAdministradorService.agregarPorListaReservaAdministrador(aGuardar)
      .subscribe(res => {
        this.resetForm();
        console.log(res);
      });
  }

  validarDiasHorariosGuardar() {
    if (!this.diasAsignados || !this.diasAsignados.length) {
      window.alert('Seleccione los días a generar');
      //this.toastrService.show('ADVERTENCIA', "Seleccione los días a generar", { preventDuplicates: true });
      return false;
    }
    if (!this.horariosAsignados || !this.horariosAsignados.length) {
      window.alert('Seleccione los horarios a generar');
      //this.toastrService.show('ADVERTENCIA', "Seleccione los horarios a generar", { preventDuplicates: true });
      return false;
    }
    return true;
  }

  resetForm() {
    //document.defaultView?.location.reload();
    this.btnGuardar = false;

    setTimeout(function () {
      // Do something after 5 seconds
      location.reload();//reload page
    }, 3000);
  }

  mostrarCambio(event: any) {
    console.log(event);
  }

  dateClick(event: any) {
    console.log(event);
  }

  ///////////////////////Listados
  listarReservas() {
    this.reservaService.obtenerReservas()
      .subscribe(res => {
        this.reservaService.reservaUltima = res as Reserva[];
      });
  }

  actualizarReserva(reserva: Reserva) {
    this.reservaService.selectedReserva = reserva;
    this.reservaService.selectedReserva.confirmado = "si";
    console.log(this.reservaService.selectedReserva);
    this.reservaService.confirmarReserva(this.reservaService.selectedReserva)
      .subscribe(res => {
        window.alert('Reserva Confirmada');
        //this.toastrService.show('ADVERTENCIA', "Reserva Confirmada", { preventDuplicates: true });
        this.reservaService.obtenerReservas()
          .subscribe(res => {
            this.data = (res as Reserva[]);
            this.chRef.detectChanges();
          });
      })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}