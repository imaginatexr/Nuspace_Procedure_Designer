import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports:[RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.css' ]
})
export class LayoutComponent  {
    router = inject(Router);
  loggedUser : any;
    constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { 
    const localUser = localStorage.getItem('currentUser');
    if(localUser!= null)
    {
      this.loggedUser = JSON.parse(localUser);
    }
    else{
      this.loggedUser  = {
        mailID: 'demo@imaginate.in', displayName: '',
        jwtAccessToken: '',
        refreshAccessToken: '',
        accessToken: '',
        type: '',
        tenantID: '',
        onPremises: false
          }; 
    }
    }

    onLogOut()
    {
      this.authenticationService.logout(); 
      this.router.navigateByUrl('/login');
    }

    }

