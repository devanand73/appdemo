import { Component, OnInit } from '@angular/core';
import * as saveAs from "file-saver";
import { Document, Packer, Paragraph, TextRun, ITableOptions, WidthType } from "docx";
import { StepsService } from '../steps/steps.service';
import { StepsoutputService } from './../script/script.service';
import { StepModel } from '../steps/steps.model';
import { ActivatedRoute } from '@angular/router';
import { WelcomeService } from '../welcome/welcome.service';

@Component({
  selector: 'app-docx',
  templateUrl: './docx.component.html',
  styleUrls: ['./docx.component.scss']
})
export class DocxComponent implements OnInit {

  isTransformData = false;
  dropdown: boolean;
  transformStep = [];
  scriptsList = [];
  stepModel: StepModel;
  constructor(
    private stepSrvice: StepsService,
    private stepoutservice: StepsoutputService,
    private activatedRoute: ActivatedRoute,
    private welcomeService: WelcomeService
    ) { 
    this.dropdown = false;
  }

  ngOnInit() {
    this.stepModel = new StepModel();
    this.activatedRoute.params
    .subscribe((params)=>{
      this.getStep(params['stepId']);
      });
    
    this.fetchScrit();
  }

  getStep(id){
    this.stepSrvice.find(id)
    .subscribe((response: any)=>{
      this.stepModel = response;
      this.transformStep = response.stepsDetail;
    });
  }


  fetchScrit() {
    this.stepoutservice.getScript()
    .subscribe((response: any) => {
      this.scriptsList = response;
    });
  }

  toggleDropDown() {
    this.dropdown = !this.dropdown;
  }

  selectScript(script: any) {
    this.transformStep = [];
    const newStepd = JSON.parse(JSON.stringify(this.stepModel.stepsDetail));
    this.transformStep = newStepd.map((stepsData) => {
      for(let key in stepsData) {
        stepsData[key] = this.replaceStr(stepsData[key], script);
      }
      return stepsData;
    });
    this.dropdown = false;
    this.isTransformData = true;
  }

  replaceStr(stringData: any,  value:string) {
    if ((typeof stringData === 'string' || stringData instanceof String)) {
      return stringData.replace(/<<p>>/g, `${value}`);
    } else {
      return stringData;
    }
  }

  generateDocx() {

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

    doc.Header.createParagraph("Hi Demo App You can change ");

    doc.Footer.createParagraph("Foo Bar corp. ")
    .center()
    .addRun(new TextRun("Page Number: ").pageNumber())
    .addRun(new TextRun(" to ").numberOfTotalPages());

    doc.createParagraph("Hello World 1").pageBreak();
   
    const table = doc.createTable(optionData)
    this.transformStep.forEach((tableData, currentIndex)=>{
      const cell1 = table.getCell(currentIndex, 0);
      cell1.setMargins({top: 10, bottom: 10});
      cell1.addParagraph(new Paragraph(tableData['step']));
      const cell2 = table.getCell(currentIndex, 1);
      cell2.addParagraph(new Paragraph(tableData['note']));
    });
  
    doc.createParagraph("").pageBreak();
    doc.createParagraph("Hello World 2").pageBreak();

    const packer = new Packer();
    packer.toBlob(doc).then(blob => {
      saveAs(blob, `${this.stepModel.stepsName}.docx`);
    });
  }
}
