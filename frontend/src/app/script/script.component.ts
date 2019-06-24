import { Component, OnInit } from '@angular/core';
import { StepModel } from './../steps/steps.model';
import { StepsService } from './../steps/steps.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { STEP, BTNLABEL } from '../constant/app.constant';
import { ScriptModel } from './script.model';
import { ScriptService } from './script.service';

@Component({
  selector: 'app-steps',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {

  STEPCONST = STEP; // Constant Import from App Constant File
  BTNCONST = BTNLABEL; // Constatant
  stepModel: StepModel;
  listOfStep = Array();
  script = null;
  isEnableSave = '';
  stepList = [];
  scriptModel: ScriptModel;
  scriptList: [];
  scriptDetail: any;
  stepObj = {};
  constructor(
    config: NgbModalConfig,
    private stepSrvice: StepsService, // Injecting Step service for Add, Fetch and Update
    private toastr: ToastrService, // Injecting Toaster Service for alert,
    private modalService: NgbModal, // Injecting Bootstrap Modal Service injection
    private route: Router, // Injecting Angular Router for Navigation,
    private scriptService: ScriptService
  ) {
    this.scriptModel = new ScriptModel();
    this.stepModel = new StepModel(); // Creating pojo object along with name
    config.backdrop = 'static'; // Disabling Modal on outside click
    config.keyboard = false; // Disable cancel Modal on ESC key
  }

  // Init function for more detail please refer Angular.io guide
  ngOnInit() {
    this.getSteps(); //  List of Steps api (Name and id only)
    this.getScript();
  }

// get all steps data from api

  getSteps() {
    this.stepSrvice.getStep()
      .subscribe((response: any) => {
        this.listOfStep = response;
        this.listOfStep.forEach((data) => {
          data.scriptStatus = false;
          if (this.stepObj[data._id] === undefined) {
            this.stepObj[data._id] = data;
          }
        });
      });
  }

// fetch all script data from api

  getScript() {
    this.scriptService.getScript()
      .subscribe((res: any) => {
        this.scriptList = res;
      });
  }

  // Drop down function

  selectScript(script: any) {
    this.resetSelect();
    if (this.script === null) { // If you are not select any from down return
      return;
    }

    if (this.script === 'new') {
      this.isEnableSave = this.script;
    } else {
      if (this.script && this.script.steps && this.script.steps.length > 0) {
        this.isEnableSave = 'update';
        this.scriptModel = this.script;
        console.log(this.script);
        this.mapScriptStep(this.script.steps);
      }
    }
  }

// Map Script data if select preexisting data from drop down to make check box as true

  mapScriptStep(data: any) {
    data.forEach((listData: any) => {
      if (this.stepObj[listData]) {
        this.stepObj[listData].scriptStatus = true;
      }
    });
  }

  // Deselection of checkbox and making model empty if you selection new or null

  resetSelect() {
    this.scriptModel.steps = [];
    this.listOfStep.forEach((data) => {
      data.scriptStatus = false;
    });
  }

// Open Modal for adding new script name

  openSaveModal(content) {
    if (this.scriptModel.steps.length === 0) {
      this.toastr.warning('Please select at least one step for saving script');
      return;
    }
    this.modalService.open(content)
      .result.then((result) => { // If Result will get name will save data
        if (result && result.value) {
          this.scriptModel.name = result.value;
          this.scriptModel.status = true;
          this.scriptService.addScript(this.scriptModel)
            .subscribe((data) => {
              this.toastr.success('Script Successfully saved');
              this.route.navigate(['welcome']);
            });
        }
      });
  }

// To save record data

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

// Select check box true aka Adding step into script

  selectStep(event, id: string) {
    if (event.target.checked === true) {
      this.scriptModel.steps.push(id);
    }

    if (event.target.checked === false) {
      const index = this.scriptModel.steps.indexOf(id);
      if (index > -1) {
        this.scriptModel.steps.splice(index, 1);
      }
    }
  }

// Back Navigation to go back in welcome screen

  back() {
    this.route.navigate(['welcome']);
  }

// Save data

  update() {
    if (!this.scriptModel['_id'] || !this.scriptModel.name) {
      this.toastr.error('Script name is required', '');
    }

    this.scriptService.updateScript(this.scriptModel)
      .subscribe((res) => {
        this.toastr.success('Script update successfully');
        this.route.navigate(['welcome']);
      });
  }

}
