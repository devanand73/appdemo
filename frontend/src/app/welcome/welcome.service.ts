import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WelcomeService {

    private counter = environment.appUrl + 'counter';
    constructor(
        private http: HttpClient
    ) {}

    addCounter(): Observable<any> {
        return this.http.post(this.counter, {})
            .pipe(map(responseData => {
                return responseData;
            }));
    }

    getCounter(): Observable<any> {
        return this.http.get(this.counter)
            .pipe(map(responseData => {
                return responseData;
            }));
    }
}