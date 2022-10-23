import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PenguinComponent } from './penguin/penguin.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LottieModule } from 'ngx-lottie';
import { BrowserModule } from '@angular/platform-browser';


export function playerFactory(): any {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    PenguinComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
