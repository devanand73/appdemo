import { Component, OnInit } from '@angular/core';
import { StepModel, Steplist } from './steps.model';
import { StepsService } from './steps.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps-detail',
  templateUrl: './steps-detail.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsDetailComponent implements OnInit {

  stepDataList = [];

  constructor(
    private router: Router,
    private stepSrvice: StepsService,
    private toastr: ToastrService,
    private modalService: NgbModal, // Injecting Step service for Add, Fetch and Update
  ) {
  }

  // Init function for more detail please refer Angular.io guide
  ngOnInit() {
    this.stepSrvice.getStep()
      .subscribe((response: any) => {
        this.stepDataList = response;
      });
  }

  openModal(content, stepId, index) {
    this.modalService.open(content, { size: 'sm' })
      .result.then((result) => {
        if(result === 'delete') {
          this.stepSrvice.deleteStep(stepId).subscribe((response) => {
            this.stepDataList.splice(index, 1);
            this.toastr.success('Steps successfully deleted');
          });
        }
      }, (err)=>{
        console.log(err);
      });
  }

  edit(id: string) {
    this.router.navigate(['steps',{editId: id}]);
  }

  openDocx(id: string) {
    this.router.navigate(['generate-docx',{stepId: id}]);
  }

}
