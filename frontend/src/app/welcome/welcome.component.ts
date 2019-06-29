import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  totalCount: any;

  constructor(
    private welcomeService: WelcomeService
  ) {

  }

  ngOnInit() {
    this.welcomeService.getCounter().subscribe((res) => {
      this.totalCount = res;
    });
  }
}
