import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ScriptModel } from './script.model';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})

export class ScriptService {

    private scriptUrl = environment.appUrl + 'script';
    constructor(
        private http: HttpClient,
        private ngxService: NgxUiLoaderService
    ) {

    }

    addScript(body: ScriptModel) {
        const bodyData = body;
        this.ngxService.start();
        return this.http.post(this.scriptUrl, bodyData)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    getScript() {
        this.ngxService.start();
        return this.http.get<ScriptModel>(this.scriptUrl)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    stepDetail(id: string) {
        this.ngxService.start();
        return this.http.get<ScriptModel>(`${this.scriptUrl}/step/${id}`)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    deleteScript(idData: string): Observable<any> {
        this.ngxService.start();
        return this.http.post(`${this.scriptUrl}/delete`, { id: idData })
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    updateScript(data) {
        this.ngxService.start();
        const bodyData = data;
        return this.http.put(this.scriptUrl, bodyData)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }
}