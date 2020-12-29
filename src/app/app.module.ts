import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ManageQuizComponent } from './manage-quiz/manage-quiz.component';
import { ManagePromotionComponent } from './manage-promotion/manage-promotion.component';
import { ManageAdvertizeComponent } from './manage-advertize/manage-advertize.component';
import { SettingComponent } from './setting/setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { DatePipe } from '@angular/common';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ManageQuizComponent,
    ManagePromotionComponent,
    ManageAdvertizeComponent,
    SettingComponent,
    DashboardComponent,
    ConfirmModalComponent,
    AlertMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    DragDropModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
