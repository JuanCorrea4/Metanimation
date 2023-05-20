import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsComponent } from './components/news/news.component';
import { CoursesComponent } from './components/courses/courses.component';
import { BriefcaseComponent } from './components/briefcase/briefcase.component';
import { FavoriteNewsComponent } from './components/favorite-news/favorite-news.component';
import { FavoritePortfoliosComponent } from './components/favorite-portfolios/favorite-portfolios.component';
import { FavoriteCoursesComponent } from './components/favorite-courses/favorite-courses.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { MembershipComponent } from './components/membership/membership.component';
import { HomeComponent } from './components/home/home.component';
import { NewsMetaComponent } from './components/news-meta/news-meta.component';
import { UsComponent } from './components/us/us.component';
import { SuscriptionComponent } from './components/suscription/suscription.component';
import { TeamComponent } from './components/team/team.component';
import { BestMetaComponent } from './components/best-meta/best-meta.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetailsCourseComponent } from './components/details-course/details-course.component';
import { DetailsBriefcaseComponent } from './components/details-briefcase/details-briefcase.component';
import { BriefcaseProjectComponent } from './components/briefcase-project/briefcase-project.component';
import { DetailsNewsComponent } from './components/details-news/details-news.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    NewsComponent,
    CoursesComponent,
    BriefcaseComponent,
    FavoriteNewsComponent,
    FavoritePortfoliosComponent,
    FavoriteCoursesComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    FrequentQuestionsComponent,
    MembershipComponent,
    HomeComponent,
    NewsMetaComponent,
    UsComponent,
    SuscriptionComponent,
    TeamComponent,
    BestMetaComponent,
    InicioComponent,
    DetailsCourseComponent,
    DetailsBriefcaseComponent,
    BriefcaseProjectComponent,
    DetailsNewsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
