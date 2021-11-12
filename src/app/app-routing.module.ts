import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { IntiraymiComponent } from './intiraymi/intiraymi.component';
import { HistoriaComponent } from './historia/historia.component';
import { ReservaComponent } from './reserva/reserva.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component'; // a plugin!
import { RecorridoComponent } from './recorrido/recorrido.component';
import { ReservaAdministradorComponent } from './reserva-administrador/reserva-administrador.component';
import { CapacComponent } from './capac/capac.component'; 


const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'list', component:ListComponent},
  { path: 'intiraymi', component:IntiraymiComponent},
  { path: 'historia', component:HistoriaComponent},
  { path: 'reserva', component:ReservaComponent},
  { path: 'noticia', component:NoticiaComponent},
  { path: 'noticias', component:NoticiasComponent},
  { path: 'recorrido', component:RecorridoComponent},
  { path: 'reservaAdministrador/:password', component:ReservaAdministradorComponent, },
  { path: 'reservaAdministrador', redirectTo: 'reservaAdministrador/', pathMatch: 'full' },
  { path: 'capac', component:CapacComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }