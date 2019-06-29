import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ScriptComponent } from './script.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ScriptService } from './script.service';
import { ScriptModel } from './script.model';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { StepsService } from '../steps/steps.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepModel } from '../steps/steps.model';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

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

@Injectable()
class MockStepsService {
    addStep(data: StepModel) {
        const steps = new Observable((observer: Observer<any>) => {
            observer.next(data);
            observer.complete();
        });
        return steps;
    }

    getStep() {
        const steps = new Observable((observer) => {
            observer.next(StepList);
            observer.complete();
        });
        return steps;
    }

    deleteStep(did: string) {
        const steps = new Observable((observer) => {
            observer.next('Component Deleted');
            observer.complete();
        });
        return steps;
    }

    updateStep(body: StepModel) {
        const steps = new Observable((observer) => {
            observer.next(StepList[0]);
            observer.complete();
        });
        return steps;
    }

    find(id: any) {
        const steps = new Observable((observer) => {
            observer.next(StepList[0]);
            observer.complete();
        });
        return steps;
    }
}

@Injectable()
class MockScriptService {
    addScript(data: ScriptModel) {
        const steps = new Observable((observer: Observer<any>) => {
            observer.next(script);
            observer.complete();
        });
        return steps;
    }

    getScript() {
        const steps = new Observable((observer) => {
            observer.next(script);
            observer.complete();
        });
        return steps;
    }

    stepDetail(did: string) {
        const steps = new Observable((observer) => {
            observer.next('Component Deleted');
            observer.complete();
        });
        return steps;
    }

    deleteScript(did: string) {
        const steps = new Observable((observer) => {
            observer.next('Component Deleted');
            observer.complete();
        });
        return steps;
    }

    updateScript(body: ScriptModel) {
        const steps = new Observable((observer) => {
            observer.next(body);
            observer.complete();
        });
        return steps;
    }

}

describe('Script Component', () => {
    let fixture: ComponentFixture<ScriptComponent>;
    let component: ScriptComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ScriptComponent
            ],
            imports: [
                FormsModule,
                BrowserModule,
                ToastrModule.forRoot(),
                RouterTestingModule,
                NgbModule,
                BrowserAnimationsModule,
                NgxUiLoaderModule,
            ],
            providers: [
                 HttpClient,
                HttpHandler,
                { provide: ScriptService, useClass: MockScriptService },
                { provide: StepsService, useClass: MockStepsService },
                ToastrService,
                HttpClient,
                HttpHandler,
                NgbModal,
                NgbModalConfig,
                NgxUiLoaderService
            ],
            //    schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ScriptComponent);
        component = fixture.componentInstance;
    });

    it('Script component should be load', async () => {
        expect(component).toBeTruthy();
    });

    it('#getStep() listOfStep should more  than zero', async () => {
        component.getSteps();
        expect(component.listOfStep.length).toBeGreaterThan(0);
    });

    it('#getScript() scriptList should have truthy', async () => {
        component.getScript();
        expect(component.scriptList).toBeTruthy();
    });

    it('Select script if select value is null function should return false', async () => {
        component.script = null;
        expect(component.selectScript(null) === null).toBe(false);
    });

    it('Select script if select value is new', async () => {
        component.script = 'new';
        component.selectScript('any');
        expect(component.isEnableSave).toBe('new');
    });

    it('#OpensaveModal() function if no step, it should return undefined', async () => {
        component.scriptModel = script;
        component.scriptModel.steps = Array();
        expect(component.openSaveModal('any')).toBe(undefined);
    });

    it('#save() if step name undefined, function should not execute save and return with undeined', async () => {
        component.save();
        component.stepModel.stepName = undefined;
        expect(component.save()).toBeFalsy();
    });

    it('#save() it should be update "listofStep"', async () => {
        component.stepModel = StepList[0];
        component.save();
        expect(component.listOfStep).toBeTruthy();
    });

    it('#selectStep() Step value should be [12345] if checked the step', async () => {
        const event = {
            target: {
                checked: true
            }
        };
        component.selectStep(event, '12345');
        expect(component.scriptModel.steps.length).toBeGreaterThan(0);
    });

    it('#selectStep() uncheck should remove script from step', async () => {
        const event = {
            target: {
                checked: false
            }
        };
        component.selectStep(event, '12345');
        expect(component.scriptModel.steps.length).toBe(0);
    });

    it('#update()', async () => {
        component.scriptModel = script;
        component.scriptModel.name = 'test1';
        component.update();
        expect(component.scriptModel.name).toBe('test1');
    });


    afterAll(() => {
        fixture.destroy();
      });
});
