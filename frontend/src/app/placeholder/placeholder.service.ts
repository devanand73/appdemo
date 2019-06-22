import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ScriptModel } from './placeholder.model';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class StepsoutputService {

    private scriptUrl = environment.appUrl + 'script';
    constructor(
        private http: HttpClient
    ) {

    }

    addScript(body: ScriptModel) {
        const bodyData = body
        return this.http.post(this.scriptUrl, bodyData)
            .pipe(map(responseData => {
                return responseData;
            }));
    }

    getScript() {
        return this.http.get<ScriptModel>(this.scriptUrl)
            .pipe(map(responseData => {
                return responseData;
            }));
    }
    
    deleteScript(id: string): Observable<any>{
        return this.http.post(`${this.scriptUrl}/delete`, {id: id})
            .pipe(map(responseData => {
                return responseData;
            }));
    }
}