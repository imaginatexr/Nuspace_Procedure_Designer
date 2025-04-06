import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  currentUser: User;
  constructor(private router: Router, private authenticationService: AuthenticationService){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}




// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'Assist Procedure Designer';
//   //diagramUrl = 'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
//   diagramUrl ='./assets/procedureDesignerSample.bpmn';

//   importError?: Error;
//   handleImported(event) {

//     const {
//       type,
//       error,
//       warnings
//     } = event;

//     if (type === 'success') {
//       console.log(`Rendered diagram (%s warnings)`, warnings.length);
//     }

//     if (type === 'error') {
//       console.error('Failed to render diagram', error);
//     }

//     this.importError = error;
//   }

// }
