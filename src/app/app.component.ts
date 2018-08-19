import { Component } from '@angular/core';
import { Constants } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Idle Sci-Fi 4X';

  
  get constants() {
    return Constants;
  }  
}
