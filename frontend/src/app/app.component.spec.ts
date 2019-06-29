import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { StepsComponent } from './steps/steps.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { async } from 'q';

describe('Starting App', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StepsComponent,
        WelcomeComponent
      ],

      imports: [
        FormsModule,
        BrowserModule,
        RouterTestingModule.withRoutes(
          [{path: '', component: StepsComponent},
          {path: 'simple', component: WelcomeComponent}]
        )
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('Side menu in intial state "isExpand should be" False', async() => {
    expect(component.isExpandNav).toBe(false);
});

  it('Side menu after expand "isExpand should be Truthy', async() => {
      component.toggleNav();
      expect(component.isExpandNav).toBe(true);
  });


  afterAll(() => {
    fixture.destroy();
  });


});
