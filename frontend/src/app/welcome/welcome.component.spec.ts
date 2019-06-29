// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {WelcomeComponent} from './welcome.component';
import {WelcomeService} from './welcome.service';
import { By } from '@angular/platform-browser'
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable()
class MockWelcomeService { }

describe('WelcomeComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WelcomeComponent
      ],
      imports: [
        NgxUiLoaderModule,
        ToastrModule.forRoot()
      ],
      providers: [
        {provide: WelcomeService, useClass: MockWelcomeService},
        NgxUiLoaderService,
        ToastrService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('Steps Box name should "Steps"', ()=> {
    const name = fixture.debugElement.query(By.css('#step'));
    expect(name.nativeElement.textContent.trim()).toBe('Steps');
  });

  it('Scripts Box name should "Scripts"', ()=> {
    const name = fixture.debugElement.query(By.css('#script'));
    expect(name.nativeElement.textContent.trim()).toBe('Scripts');
  });

  it('Placeholder Box name should "Placeholder"', ()=> {
    const name = fixture.debugElement.query(By.css('#placeholder'));
    expect(name.nativeElement.textContent.trim()).toBe('Placeholder');
  });

  it('Docx Box name should "Generated Docx"', ()=> {
    const name = fixture.debugElement.query(By.css('#docx'));
    expect(name.nativeElement.textContent.trim()).toBe('Generated Docx');
  });

});
