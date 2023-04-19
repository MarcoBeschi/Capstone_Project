import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LogInComponent } from '../log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { TokenInterceptorsInterceptor } from '../token-interceptors.interceptor';
import { LocalitaComponent } from 'src/app/components/localita/localita.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';



@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path:'homepage',
        component:HomepageComponent
      },
      {
        path:'login',
        component:LogInComponent
      },
      {
        path:'signup',
        component:SignUpComponent
      },
      {
        path: 'localita',
        component: LocalitaComponent
      },
    ])
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorsInterceptor,
      multi:true
    }
  ]
})
export class AuthModuleModule { }
