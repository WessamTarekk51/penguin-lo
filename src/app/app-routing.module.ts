import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PenguinComponent } from './penguin/penguin.component';

const routes: Routes = [
  { path: 'penguin', component: PenguinComponent},
  { path: 'home', component: AppComponent},
  { path: 'feedback', component: FeedbackComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
