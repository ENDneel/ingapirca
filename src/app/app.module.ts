import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgImageSliderModule } from 'ng-image-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DataTablesModule } from 'angular-datatables';

//import es from '@angular/common/locales/es';
//import { registerLocaleData } from '@angular/common';

//registerLocaleData(es);

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { IntiraymiComponent } from './intiraymi/intiraymi.component';
import { HistoriaComponent } from './historia/historia.component';
import { SipceComponent } from './sipce/sipce.component';
import { ReservaComponent } from './reserva/reserva.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { RecorridoComponent } from './recorrido/recorrido.component';
import { MontaniaComponent } from './montania/montania.component';
import { ReservaAdministradorComponent } from './reserva-administrador/reserva-administrador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbTimepickerModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NebularModule,  } from './nebular/nebular.module';
import { config, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CapacComponent } from './capac/capac.component';
import { NoticiaAdministradorComponent } from './noticia-administrador/noticia-administrador.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { FilterPipe } from './pipes/filter.pipe'; // a plugin!
import { AdminService } from './services/admin.service';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    IntiraymiComponent,
    HistoriaComponent,
    SipceComponent,
    ReservaComponent,
    NoticiaComponent,
    RecorridoComponent,
    MontaniaComponent,
    ReservaAdministradorComponent,
    CapacComponent,
    NoticiaAdministradorComponent,
    NoticiasComponent,
    FilterPipe,
    
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    NgImageSliderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbTimepickerModule.forRoot(),
    NbToastrModule.forRoot(config),
    NbLayoutModule,
    NbEvaIconsModule,
    NebularModule,
    FullCalendarModule
    
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ],
  providers: [
    AdminService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
