import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { LocalitaComponent } from './components/localita/localita.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ArticleComponent } from './components/article/article.component';

const routes: Routes = [
  {
    path:'users', loadChildren:()=> import ('./components/users/users-module/users-module-routing.module').then(m=>m.UsersModuleRoutingModule),
    canActivate:[AuthGuardGuard]
  },
  {
    path: '',
    component: HomepageComponent,

  },
  {
    path: 'localita/:id',
    component: LocalitaComponent,
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
