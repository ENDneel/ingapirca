import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service';

declare var $: any;


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pagina-inga';
  esAdministrador: boolean = false;

  constructor(public adminService: AdminService, private router: Router) { 
  }

  loggout(){
    this.adminService.logOutAdministrador();
    this.router.navigateByUrl("/");
  }

}
