import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes,CanActivate } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SidebarModule } from 'ng-sidebar';


import { AppComponent } from './app.component';
import { headerMenu } from './header.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MiscComponent } from './misc/misc.component';
import { PagerService } from './_services/index';
import { EmployeeComponentView }  from './employees/employeeView.component';
import { EmployeesSalaryPipe }  from './employees/employeeSalary.pipe';
import { SearchFilterPipe} from './employees/filter.pipe';
import { StaffComponent } from './staff/staff.component';
import { ShopComponent } from './shop/shop.component';
import { CompanyComponent } from './company/company.component';
import { ProductComponent } from './product/product.component';
import { dateFormatPipe } from './employees/datePipe';
import { LoggedInGuard } from './employees/login_check.service';
import { LogoutComponentComponent } from './logout-component/logout-component.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';
import { DWRComponent } from './dwr/dwr.component';
import { TestDirectiveDirective } from './test-directive.directive';
import { CheckReportComponent } from './check-report/check-report.component';



const appRoutes=[
					{path:'home', component:HomeComponent,pathMatch:'full',canActivate: [LoggedInGuard]},
					{path:'DWR', component:DWRComponent,pathMatch:'full',canActivate: [LoggedInGuard]},
					{path:'Customer' , component:EmployeesComponent,canActivate: [LoggedInGuard]},
					{path:'Customer/:id1' , component:HomeComponent,canActivate: [LoggedInGuard]},
					{path:'Customer/:id1/:name1' , component:EmployeesComponent,canActivate: [LoggedInGuard]},
					{path:'login' , component:LoginComponent},
					{path:'' ,redirectTo:'',pathMatch:'full'},
					{path:'staff' , component:StaffComponent,canActivate: [LoggedInGuard]},
					{path:'shop' , component:ShopComponent,canActivate: [LoggedInGuard]},
					{path:'company' , component:CompanyComponent,canActivate: [LoggedInGuard]},
					{path:'product' , component:ProductComponent,canActivate: [LoggedInGuard]},
					{path:'NewOrder' , component:NewOrderComponent,canActivate: [LoggedInGuard]},
					{path:'ViewOrder' , component:ViewOrderComponent,canActivate: [LoggedInGuard]},
					{path:'checkReport' , component:CheckReportComponent,canActivate: [LoggedInGuard]},
					
					{path:'logout' , component:LogoutComponentComponent},
					{path:'**' , component:MiscComponent}
				];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    HomeComponent,
    LoginComponent,
    MiscComponent,EmployeesSalaryPipe,EmployeeComponentView,SearchFilterPipe, StaffComponent, ShopComponent, CompanyComponent, ProductComponent ,dateFormatPipe, LogoutComponentComponent,headerMenu, NewOrderComponent, ViewOrderComponent,ViewOrderComponent, ViewOrderDetailsComponent, DWRComponent, TestDirectiveDirective, CheckReportComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),FormsModule,HttpModule,AlertModule.forRoot(),BsDropdownModule.forRoot(),ModalModule.forRoot(),
	BsDatepickerModule.forRoot(),Ng2TableModule,NgxPermissionsModule.forRoot(), SidebarModule.forRoot()
  ],
  providers: [PagerService,LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
