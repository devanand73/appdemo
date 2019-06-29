import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  totalCount: any;

  constructor(
    private welcomeService: WelcomeService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit() {
    this.welcomeService.getCounter().subscribe((res) => {
      this.totalCount = res;
    }, (err) => {
      console.log(err);
    });
  }

  handelErr(err) {
    this.handelErr(err);
    this.toastr.error(err);
    this.ngxService.stop();
  }
}
