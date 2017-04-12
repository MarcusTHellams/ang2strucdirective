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
  instructions: Array<any> = [1, 20, 1];
  private random(max, min) {
    return Math.round(Math.random() * (max - min) + min);
  };

  changeInstructions() {
    this.instructions = this.instructions.map((num, i) => {
      return i === 2 ? num : num += 1;
    });
  }
}
