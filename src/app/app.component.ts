import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  show = false;
  killer = true;

  lowerbound = 1;
  upperbound = 20;
  increment = 2;
}
