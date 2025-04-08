import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

import { LoginComponent } from './login';
 import { BpmnViewerFileComponent } from './CustomDiagram/bpmn-viewer-file/bpmn-viewer-file.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component:LoginComponent},

  { path: '', component:LayoutComponent , canActivate:[AuthGuard], children :[{ path: 'app-bpmn-viewer-file', component:BpmnViewerFileComponent , canActivate:[AuthGuard]}]},

  // { path: 'home', component:HomeComponent, canActivate:[AuthGuard] },
  { path: 'unAuthorized', component:UnAuthorizedComponent },
   { path: 'dashBoard', component:BpmnViewerFileComponent , canActivate:[AuthGuard]},

  // //redirect to home
  // { path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Make sure it's using forRoot(routes)
  exports: [RouterModule]
})

export class appRoutingModule { }

//export const appRoutingModule = RouterModule.forRoot(routes);