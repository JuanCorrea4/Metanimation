import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BriefcaseComponent } from './components/briefcase/briefcase.component';
import { CoursesComponent } from './components/courses/courses.component';
import { FavoriteNewsComponent } from './components/favorite-news/favorite-news.component';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { MembershipComponent } from './components/membership/membership.component';
import { NewsComponent } from './components/news/news.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SuscriptionComponent } from './components/suscription/suscription.component';
import { DetailsCourseComponent } from './components/details-course/details-course.component';
import { DetailsBriefcaseComponent } from './components/details-briefcase/details-briefcase.component';
import { BriefcaseProjectComponent } from './components/briefcase-project/briefcase-project.component';
import { DetailsNewsComponent } from './components/details-news/details-news.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch: "full"},
  { path: 'home', component: HomeComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'briefcase', component: BriefcaseComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'news', component: NewsComponent},
  { path: 'favorite-news', component: FavoriteNewsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'membership', component: MembershipComponent},
  { path: 'suscription', component: SuscriptionComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'detailsCourse', component: DetailsCourseComponent},
  { path: 'detailsBriefcase', component: DetailsBriefcaseComponent},
  { path: 'briefcase-project', component: BriefcaseProjectComponent},
  { path: 'membership', component: MembershipComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'details-news', component: DetailsNewsComponent},
  { path: 'dashboard', component: DashboardComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
