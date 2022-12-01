import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { MaterialModule } from './material/material.module';
import { BookingComponent } from './component/booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ScheduleComponent,
    BookingComponent,
    // MaterialModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [ authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
