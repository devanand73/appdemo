import { Component, OnInit } from '@angular/core';
import { StepModel, Steplist } from './steps.model';
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

  selectedStep: any = null;
  stepId: string;
  eventAction = 'add';
  stepName: string;
  loading: true;
  steplist: Steplist;
  stepModel: StepModel;
  stepDetail = [];
  listOfStep = [];

  


  constructor(
    config: NgbModalConfig,
    private stepSrvice: StepsService, // Injecting Step service for Add, Fetch and Update
    private toastr: ToastrService, // Injecting Toaster Service for alert,
    private modalService: NgbModal, // Injecting Bootstrap Modal Service injection
    private activatedRoute: ActivatedRoute, // Injecting Activate Roter Service
    private route: Router // Injecting Angular Router for Navigation
  ) {
    this.steplist = new Steplist(); // Creating Pojo Object of step list
    this.stepModel = new StepModel(); // Creating pojo object along with name
    config.backdrop = 'static'; // Disabling Modal on outside click
    config.keyboard = false; // Disable cancel Modal on ESC key
  }


  // Init function for more detail please refer Angular.io guide
  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      if (param['editId']) {
        this.eventAction = 'edit';
        this.stepId = param['editId'];
        this.getStepDetail(param['editId']);
      }
    });
    this.getSteps(); //  List of Steps api (Name and id only)
  }

  getStepDetail(id: string) {
    this.stepSrvice.find(id)
      .subscribe((response: StepModel) => {
        this.stepModel = response;
      })
  }

  getSteps() {
    this.stepSrvice.getStep()
      .subscribe((response: any) => {
        this.listOfStep = response;
      });
  }

  selectStep(id) {
    if(id !== null) {
      this.stepSrvice.find(id).subscribe((response)=> {
        this.stepModel = response;
        this.stepModel.stepsName = '';
        this.stepModel._id = undefined;
        this.toastr.success('successfull imported');
        this.eventAction = 'add';
      });
    }
  }

  // Pusing steps into temp Array

  addstep() {
    this.steplist.status = true;
    if (!this.steplist.step || !this.steplist.note) {
      this.toastr.error('All field is mandatory', '');
      return;
    }

    this.stepModel.stepsDetail.unshift(this.steplist);
    this.steplist = new Steplist();
  }

  // Poping Array element from temp Array (Its Not Deleting any Data from database)

  delete(id: string, index: number) {
    this.stepModel.stepsDetail.splice(index, 1);
  }

  //@@ Open Modal for Entering Name of Step
  //@@

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        if (result.value) {
          this.stepModel.created_date = new Date().toISOString();
          this.stepModel.stepsName = result.value;
          this.save(this.stepModel);
        }
      });
  }

  //@Dissmiss Modal
  //@@


  // If application is new Then save will enable

  save(data: StepModel) {
    this.stepSrvice.addStep(data)
      .subscribe((response) => {
        this.toastr.success('Step sucessfully saved');
        this.route.navigate(['steps-detail']);
      });
  }

  // Edit application will update

  update() {
    this.stepSrvice.updateStep(this.stepModel)
      .subscribe((response) => {
          this.toastr.success('Steps updated Successfully');
          this.route.navigate(['steps-detail']);
      });
  }

  cancel() {
    this.route.navigate(['steps-detail']);
  }

}
