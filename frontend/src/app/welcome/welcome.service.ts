import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})
export class WelcomeService {

    private counter = environment.appUrl + 'counter';
    constructor(
        private http: HttpClient,
        private ngxService: NgxUiLoaderService
    ) {}

    addCounter(): Observable<any> {
        this.ngxService.start();
        return this.http.post(this.counter, {})
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
             }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }

    getCounter(): Observable<any> {
        this.ngxService.start();
        return this.http.get(this.counter)
            .pipe(map(responseData => {
                this.ngxService.stop();
                return responseData;
            }), catchError((err) => {
                this.ngxService.stop();
                return err;
            }));
    }
}