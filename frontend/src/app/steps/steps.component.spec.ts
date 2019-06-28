import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { StepsComponent } from './steps.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { StepModel } from './steps.model';
import { Observable, Observer } from 'rxjs';
import { StepsService } from './steps.service';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

describe('Steps component', () => {
    let fixture: ComponentFixture<StepsComponent>;
    let component: StepsComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                StepsComponent
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
                { provide: StepsService, useClass: MockStepsService },
                ToastrService,
                HttpClient,
                HttpHandler,
                NgbModal,
                NgbModalConfig,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(StepsComponent);
        component = fixture.componentInstance;
    });

    it('Step component should be load', async () => {
        expect(component).toBeTruthy();
    });

    it('List of steps greater than one', async () => {
        component.getSteps();
        fixture.detectChanges();
        expect(component.listOfStep.length).toBe(2);
    });

    it('save function test', async () => {
        component.stepModel = {
            stepName: 'Test 3',
            note: 'Note 3'
        };

        component.save();
        fixture.detectChanges();
        expect(component.listOfStep.length).toBe(2);
    });

    it('delete function test', async () => {
        component.delete('dummycontent', 'testing', 0);
        fixture.detectChanges();
        expect(component.listOfStep.length).toBe(2);
    });

    afterAll(() => {
        fixture.destroy();
      });
});
