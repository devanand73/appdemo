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
import { PlaceHolderModel } from './placeholder.model';
import { PlaceHolderComponent } from './placeholder.component';
import { PlaceHolderService } from './placeholder.service';

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
    add(data: PlaceHolderModel) {
        const phscript = new Observable((observer: Observer<any>) => {
            observer.next(data);
            observer.complete();
        });
        return phscript;
    }

    get() {
        const phscript = new Observable((observer) => {
            observer.next(phData);
            observer.complete();
        });
        return phscript;
    }

    delete(did: string) {
        const phscript = new Observable((observer) => {
            observer.next('Component Deleted');
            observer.complete();
        });
        return phscript;
    }
}


describe('Script Component', () => {
    let fixture: ComponentFixture<PlaceHolderComponent>;
    let component: PlaceHolderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PlaceHolderComponent
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
                ToastrService,
                HttpClient,
                HttpHandler,
                NgbModal,
                NgbModalConfig,
            ],
            //    schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(PlaceHolderComponent);
        component = fixture.componentInstance;
    });

    it('#addPlaceHolder()', async () => {
        expect(component.addPlaceHolder()).toBeUndefined();
    });

    it('#addPlaceHolder()', async () => {
        component.placeHolderModel = phData[0];
        component.addPlaceHolder();
        expect(component.placeHolder.length).toBeGreaterThan(0);
    });

    it('#openModal()', async () => {
        expect(component.openModal('any', '1234', 0)).toBeUndefined();
    });

    it('#deletePlaceHolder()', async () => {
        component.placeHolder = phData;
        component.deletePlaceHolder('1234', 0);
        expect(component.placeHolder.length).toEqual(1);
    });
    afterAll(() => {
        fixture.destroy();
      });

});
