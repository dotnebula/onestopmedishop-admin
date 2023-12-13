import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/admins/login/login.component';
import { RegisterComponent } from './components/admins/register/register.component';
import { AddmedicationComponent } from './components/medications/addmedication/addmedication.component';
import { ManufacturersComponent } from './components/medications/manufacturers/manufacturers.component';
import { MedicationsComponent } from './components/medications/medications.component';
import { ViewmedicationComponent } from './components/medications/viewmedication/viewmedication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { UsersComponent } from './components/users/users.component';
import { ViewuserComponent } from './components/users/viewuser/viewuser.component';
import { AuthGuards } from './guards/auth.guard';

export const routes: Routes = [

    { path :'' , component: DashboardComponent },
    { path :'dashboard' , component: DashboardComponent },
    { path :'orders' , component: OrdersComponent , canActivate: [AuthGuards]},

    { path :'auth' , children :[
        {path: 'login' , component: LoginComponent},
        {path: 'register' , component: RegisterComponent},
    ]},

    { path :'users' , children :[
        {path: '' , component: UsersComponent},
        {path: 'create' , component: AdduserComponent},
        {path: 'update' , component: AdduserComponent},
        {path: 'view' , component: ViewuserComponent},
    ], canActivate: [AuthGuards]},

    { path :'medications' , children :[
        {path: '' , component: MedicationsComponent},
        {path: 'create' , component: AddmedicationComponent},
        {path: 'update' , component: AddmedicationComponent},
        {path: 'view' , component: ViewmedicationComponent},
        {path: 'manufacturers' , component: ManufacturersComponent},
    ], canActivate: [AuthGuards]},

    { path:"**", component: NotFoundComponent}
    
];
