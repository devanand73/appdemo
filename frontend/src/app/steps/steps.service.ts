import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StepModel } from './steps.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})

export class StepsService {

    private stepUrl = environment.appUrl + 'step';
    constructor(
        private http: HttpClient,
        private ngxService: NgxUiLoaderService
    ) { }

    addStep(body: StepModel): Observable<any> {
        this.ngxService.start();
        const bodyData = body;
        return this.http.post(this.stepUrl, bodyData)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    getStep(): Observable<StepModel> {
        this.ngxService.start();
        return this.http.get(this.stepUrl)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    deleteStep(did: string): Observable<any> {
        this.ngxService.start();
        return this.http.post(`${this.stepUrl}/delete`, { id: did })
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    updateStep(body: StepModel): Observable<any> {
        this.ngxService.start();
        return this.http.put(`${this.stepUrl}`, body)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    find(id: string) {
        return this.http.get(`${this.stepUrl}/find/${id}`)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }
}