import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { Document, Packer, Paragraph, TextRun, ITableOptions, WidthType } from 'docx';
import { ScriptService } from './../script/script.service';
import { ActivatedRoute } from '@angular/router';
import { WelcomeService } from '../welcome/welcome.service';
import { ScriptModel } from '../script/script.model';
import { PlaceHolderService } from '../placeholder/placeholder.service';
import { StepsService } from '../steps/steps.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-docx',
  templateUrl: './docx.component.html',
  styleUrls: ['./docx.component.scss']
})
export class DocxComponent implements OnInit {

  scriptModel = null;
  placeHolderModel = null;
  isTransformData = false;
  dropdown: boolean;
  transformStep = [];
  placeHolderList = [];
  scriptList = [];
  scriptDetail: ScriptModel;
  listOfStep = [];
  stepObj = {};

  constructor(
    private placeHolderService: PlaceHolderService,
    private scriptService: ScriptService,
    private activatedRoute: ActivatedRoute,
    private welcomeService: WelcomeService,
    private stepSrvice: StepsService,
    private ngxService: NgxUiLoaderService
  ) {
    this.scriptDetail = new ScriptModel();
    this.dropdown = false;
  }

  ngOnInit() {
    this.getPlaceholder();
    this.fetchScript();
    this.getSteps();
  }

  getPlaceholder() {
    this.placeHolderService.get()
      .subscribe((response: any) => {
        this.placeHolderList = response;
      });
  }

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

  fetchScript() {
    this.scriptService.getScript()
      .subscribe((response: any) => {
        this.scriptList = response;
        console.log(this.scriptList);
      });
  }

  toggleDropDown() {
    this.dropdown = !this.dropdown;
  }

  selectScript(scripts: any) {
    this.ngxService.start();
    if (this.scriptModel !== null) {
      this.scriptModel['customSteps'] = [];
      this.scriptModel.steps.forEach((element: any) => {
        if (this.stepObj[element]) {
          this.scriptModel['customSteps'].push(this.stepObj[element]);
        }
      });
    }
    this.ngxService.stop();
  }

  selectPlaceholder(text: string) {
    this.ngxService.start();
    if (text !== null) {
      this.transformStep = [];
      const newStepd = JSON.parse(JSON.stringify(this.scriptModel['customSteps']));
      this.transformStep = newStepd.map((stepsData) => {
        for (const key in stepsData) {
          if (key && stepsData[key]) {
            stepsData[key] = this.replaceStr(stepsData[key], text);
          }
        }
        this.ngxService.stop();
        return stepsData;
      });
      this.dropdown = false;
      this.isTransformData = true;
    }
  }


  replaceStr(stringData: any, value: string) {
    if ((typeof stringData === 'string' || stringData instanceof String)) {
      return stringData.replace(/<<p>>/g, `${value}`);
    } else {
      return stringData;
    }
  }

  generateDocx() {
    this.ngxService.start();
    this.welcomeService.addCounter().subscribe((res) => {
      console.log(res);
    });

    const doc = new Document();
    const optionData: ITableOptions = {
      rows: this.transformStep.length,
      columns: 2,
      width: 100,
      widthUnitType: WidthType.PERCENTAGE
    }

    doc.Header.createParagraph('Hi Demo App You can change ');

    doc.Footer.createParagraph('Foo Bar corp. ')
      .center()
      .addRun(new TextRun('Page Number: ').pageNumber())
      .addRun(new TextRun(' to ').numberOfTotalPages());

    doc.createParagraph('Hello World 1').pageBreak();

    const table = doc.createTable(optionData);
    this.transformStep.forEach((tableData, currentIndex) => {
      const cell1 = table.getCell(currentIndex, 0);
      cell1.setMargins({ top: 10, bottom: 10 });
      cell1.addParagraph(new Paragraph(tableData['stepName']));
      const cell2 = table.getCell(currentIndex, 1);
      cell2.addParagraph(new Paragraph(tableData['note']));
    });

    doc.createParagraph('').pageBreak();
    doc.createParagraph('Hello World 2').pageBreak();

    const packer = new Packer();
    packer.toBlob(doc).then(blob => {
      this.ngxService.stop();
      saveAs(blob, `${this.scriptModel.name}.docx`);
    });
  }
}
