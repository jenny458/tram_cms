import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageQuizComponent } from './manage-quiz/manage-quiz.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagePromotionComponent } from './manage-promotion/manage-promotion.component';
import { ManageAdvertizeComponent } from './manage-advertize/manage-advertize.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'quiz', component: ManageQuizComponent },
  { path: 'promotion', component: ManagePromotionComponent },
  { path: 'advertize', component: ManageAdvertizeComponent },
  { path: 'setting', component: SettingComponent },
  { path: '', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
