import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isExpandNav = false;
  title = 'frontend';

  // Navigation Expand

  toggleNav() {
    this.isExpandNav = !this.isExpandNav;
  }
}
