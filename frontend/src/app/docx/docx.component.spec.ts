import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocxComponent } from './docx.component';
import { PlaceHolderService } from '../placeholder/placeholder.service';
import { ScriptService } from '../script/script.service';
import { StepsService } from '../steps/steps.service';

const StepList = [{
    stepName: 'Test Fisrt',
    status: true,
    createdDate: new Date().toISOString(),
    note: 'First Note for testing'
}, {
    stepName: 'Test Second',
    status: true,
    createdDate: new Date().toISOString(),
    note: 'Second Note for testing'
}];

const script = {
    name: 'Test script',
    createdDate: new Date().toISOString(),
    status: true,
    steps: StepList
};

const phData = [{
    name: 'Test placeholder',
    createdDate: new Date().toISOString(),
    status: true,
},
{
    name: 'Test placeholder',
    createdDate: new Date().toISOString(),
    status: true,
}];

@Injectable()
class MockPlaceerHoldService {
    get() {
        const phscript = new Observable((observer) => {
            observer.next(phData);
            observer.complete();
        });
        return phscript;
    }
}

@Injectable()
class MockStepsService {
    getStep() {
        const steps = new Observable((observer) => {
            observer.next(StepList);
            observer.complete();
        });
        return steps;
    }
}

@Injectable()
class MockScriptService {
    getScript() {
        const steps = new Observable((observer) => {
            observer.next(script);
            observer.complete();
        });
        return steps;
    }
}

describe('Docx Component', () => {
    let fixture: ComponentFixture<DocxComponent>;
    let component: DocxComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DocxComponent
            ],
            imports: [
                FormsModule,
                BrowserModule,
                ToastrModule.forRoot(),
                RouterTestingModule,
                NgbModule,
                BrowserAnimationsModule
            ],
            providers: [
                HttpClient,
                HttpHandler,
                { provide: PlaceHolderService, useClass: MockPlaceerHoldService },
                { provide: ScriptService, useClass: MockScriptService },
                { provide: StepsService, useClass: MockStepsService },
                ToastrService,
                HttpClient,
                HttpHandler,
                NgbModal,
                NgbModalConfig,
            ],
            //    schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(DocxComponent);
        component = fixture.componentInstance;
    });

    it('#getPlaceholder', () => {
        component.getPlaceholder();
        expect(component.placeHolderList.length).toBe(2);

    });

    it('#getSteps', async () => {
        component.getSteps();
        expect(component.listOfStep.length).toBe(2);
    });

    it('#fetchScript', async () => {
        component.fetchScript();
        expect(component.scriptList).toBeTruthy();
    });

    // it('#selectScript', async () => {
    //     component.scriptModel = script;
    //     expect(component.scriptModel['customSteps'].length).toBe(0);
    // });

    it('#selectPlaceholder', async () => {
        component.scriptModel = null;
        expect(component.selectPlaceholder('text')).toBe(undefined);
    });

    // it('#selectPlaceholder() if Scrip model along with CustomSteps and Text is not null Should be return undefined', async () => {
    //     component.scriptModel = script;
    //     component.scriptModel['customSteps'] = { StepList };
    //     expect(component.selectPlaceholder('text')).toBe(undefined);
    // });

    it('#replaceStr', () => {
        const testData = ' Hi i am <<p>>';
        component.scriptModel = script;
        expect(component.replaceStr(testData, 'test')).toContain('test');
    });

    it('#generateDocx', () => {
        component.generateDocx();
    });

    afterAll(() => {
        fixture.destroy();
      });
});
