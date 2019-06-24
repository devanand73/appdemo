import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepsComponent } from './steps/steps.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { StepsDetailComponent } from './steps/steps-detail.component';
import { ScriptComponent } from './script/script.component';
import { DocxComponent } from './docx/docx.component';
import { PlaceHolderComponent } from './placeholder/placeholder.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

const appRoute = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'steps', component: StepsComponent },
  { path: 'script', component: ScriptComponent },
  { path: 'placeholder', component: PlaceHolderComponent },
  { path: 'generate-docx', component: DocxComponent }];


@NgModule({
  declarations: [
    AppComponent,
    StepsComponent,
    WelcomeComponent,
    ScriptComponent,
    DocxComponent,
    PlaceHolderComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot(appRoute),
    NgxUiLoaderModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
