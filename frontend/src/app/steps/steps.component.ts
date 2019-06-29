import { Component, OnInit } from '@angular/core';
import { StepModel } from './steps.model';
import { StepsService } from './steps.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { STEP, BTNLABEL } from '../constant/app.constant';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  STEPCONST = STEP; // Constant Import from App Constant File
  BTNCONST = BTNLABEL; // Constatant
  stepModel: StepModel;
  listOfStep = Array();

  constructor(
    config: NgbModalConfig,
    private stepSrvice: StepsService, // Injecting Step service for Add, Fetch and Update
    private toastr: ToastrService, // Injecting Toaster Service for alert,
    private modalService: NgbModal, // Injecting Bootstrap Modal Service injection
    private route: Router // Injecting Angular Router for Navigation
  ) {
    this.stepModel = new StepModel(); // Creating pojo object along with name
    config.backdrop = 'static'; // Disabling Modal on outside click
    config.keyboard = false; // Disable cancel Modal on ESC key
  }

  // Init function for more detail please refer Angular.io guide
  ngOnInit() {
    this.getSteps(); //  List of Steps api (Name and id only)
  }

  getSteps() {
    this.stepSrvice.getStep()
      .subscribe((response: any) => {
        this.listOfStep = response;
      });
  }

  delete(content, stepId, index) {
    this.modalService.open(content, { size: 'sm' })
      .result.then((result) => {
        if (result === 'delete') {
          this.stepSrvice.deleteStep(stepId)
            .subscribe((res) => {
              this.listOfStep.splice(index, 1);
              this.toastr.success('Step successfully deleted');
            });
        }
      });
  }

  save() {
    if (!this.stepModel.stepName || !this.stepModel.note) {
      this.toastr.error(this.STEPCONST.validationErr, '');
      return;
    }

    this.stepSrvice.addStep(this.stepModel)
      .subscribe((response) => {
        this.toastr.success('Step sucessfully saved');
        this.listOfStep.unshift(response);
        this.stepModel = new StepModel();
      });
  }

  back() {
    this.route.navigate(['welcome']);
  }

}
