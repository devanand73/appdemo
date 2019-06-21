import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { StepModel } from './steps.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StepsService {

    private stepUrl = environment.appUrl + 'step';
    constructor(
        private http: HttpClient
    ) {}

    addStep(body: StepModel): Observable<any> {
        const bodyData = body
        return this.http.post(this.stepUrl, bodyData)
            .pipe(map(responseData => {
                return responseData;
            }));
    }

    getStep(): Observable<StepModel> {
        return this.http.get(this.stepUrl)
            .pipe(map(responseData => {
                return responseData;
            }));
    }

    deleteStep(id: string): Observable<any>{
        return this.http.post(`${this.stepUrl}/delete`, {id: id})
            .pipe(map(responseData => {
                return responseData;
            }));
    }

    updateStep(body: StepModel) : Observable<any>{
        return this.http.put(`${this.stepUrl}`, body)
            .pipe(map(responseData => {
                return responseData;
            }));
    }

    find(id: string) {
        return this.http.get(`${this.stepUrl}/find/${id}`)
            .pipe(map(responseData => {
                return responseData;
            }));
    }
}