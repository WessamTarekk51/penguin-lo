import { Component } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-penguin';
  constructor(
    private router: Router,
  ) {}
  start(event: any){
    event.target.classList.remove('startButton')
    this.router.navigate(['/penguin']);
  }
}

