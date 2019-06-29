import { Component, OnInit } from '@angular/core';
import { PlaceHolderService } from './placeholder.service';
import { PlaceHolderModel } from './placeholder.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceHolderComponent implements OnInit {

  placeHolderModel: PlaceHolderModel;
  placeHolder = [];
  constructor(
    private plchldservice: PlaceHolderService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
  ) {
    this.placeHolderModel = new PlaceHolderModel();
  }

  ngOnInit() {
    this.plchldservice.get()
      .subscribe((response: any) => {
        this.placeHolder = response;
      }, (err) => {
        this.handelErr(err);
      });
  }

  addPlaceHolder() {
    if (!this.placeHolderModel.name) {
      this.toastr.error('Script is required', '');
      return;
    }

    this.placeHolderModel.createdDate = new Date().toISOString();
    this.plchldservice.add(this.placeHolderModel)
      .subscribe((res) => {
        this.placeHolder.unshift(res);
        this.placeHolderModel = new PlaceHolderModel();
        this.toastr.success('Script added successfully', '');
      }, (err) => {
        this.handelErr(err);
      });
  }

  openModal(content, scrptId: string, index: number) {
    this.modalService.open(content, { size: 'sm' })
      .result.then((result) => {
        if (result === 'delete') {
          this.deletePlaceHolder(scrptId, index);
        }
      }, (err) => {
        this.handelErr(err);
      });
  }

  deletePlaceHolder(scrptId: string, index: number) {
    this.plchldservice.delete(scrptId).subscribe((response) => {
      this.placeHolder.splice(index, 1);
      this.toastr.success('Steps successfully deleted');
    }, (err) => {
      this.handelErr(err);
    });
  }

  handelErr(err) {
    console.log(err);
    this.toastr.error(err);
    this.ngxService.stop();
  }

}
