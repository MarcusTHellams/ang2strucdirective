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
  myThings: Array<Number> = [1, 2, 3, 4, 5];
  removeAThing(index: number) {
    this.myThings.splice(index - 1);
  }
}
