import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { PlaceHolderModel } from './placeholder.model';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})

export class PlaceHolderService {

    private scriptUrl = environment.appUrl + 'placeholder';
    constructor(
        private http: HttpClient,
        private ngxService: NgxUiLoaderService
    ) {

    }

    add(body: PlaceHolderModel) {
        this.ngxService.start();
        const bodyData = body;
        return this.http.post(this.scriptUrl, bodyData)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    get() {
        this.ngxService.start();
        return this.http.get<PlaceHolderModel>(this.scriptUrl)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    delete(did: string): Observable<any> {
        this.ngxService.start();
        return this.http.post(`${this.scriptUrl}/delete`, { id: did })
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }
}
