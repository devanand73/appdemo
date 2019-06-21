import { Component, OnInit } from '@angular/core';
import { StepsoutputService } from './script.service';
import { ScriptModel } from './script.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {

  scriptModel: ScriptModel;
  scriptDetail= [];
  constructor(
    private script: StepsoutputService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { 
    this.scriptModel = new ScriptModel();
  }

  ngOnInit() {
    this.script.getScript()
      .subscribe((response: any) => {
        this.scriptDetail = response;
      });
  }

  addScript() {
    if(!this.scriptModel.script) {
      this.toastr.error('Script is required','');
      return;
    }

    this.scriptModel.created_date = new Date().toISOString();
    this.script.addScript(this.scriptModel)
        .subscribe((res) => {
          this.scriptDetail.unshift(res);
        this.scriptModel = new ScriptModel();
        this.toastr.success('Script added successfully', '');
        })
  }

  openModal(content, scrptId, index) {
    this.modalService.open(content, { size: 'sm' })
      .result.then((result) => {
        if(result === 'delete') {
          this.script.deleteScript(scrptId).subscribe((response) => {
            this.scriptDetail.splice(index, 1);
            this.toastr.success('Steps successfully deleted');
          });
        }
      }, (err)=>{
        console.log(err);
      });
  }

}
