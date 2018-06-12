import { Injectable } from '@angular/core';
import { UNDataResponse } from '../model/UNDataModel';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnDataService {

    constructor(private http: HttpClient) { }

    /**
     * Please note. 'Content-Type' header is set to 'application/json' by default.
     * You can completely remove _headers object in this demo and it will work properly.
     * The only one purpose of it here is to show an example of configuration in a case you
     * need to set your own custom headers.
     */
    private _unDataUrl = '../assets/countries.json';
    private _headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

    getData() {
        return this.http.get<UNDataResponse>(this._unDataUrl, this._headers);
    }
}
