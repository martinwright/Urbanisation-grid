import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {UNDataRecord, UNUniqueDataRecord} from '../model/UNDataModel';

@Injectable()
export class MessageService {
    private countryList = new Subject<any>();
    private selectedCountry = new Subject<any>();
    private undata = new Subject<any>();

    /**
     * Observable for unique list of Countries
     * @returns {Observable<any>}
     */
    countryListUpdate(): Observable<any> {
        return this.countryList.asObservable();
    }
    sendCountries(data: UNUniqueDataRecord[]) {
        this.countryList.next( data );
    }

    /**
     * Observable for country user-selection
     * @returns {Observable<any>}
     */
    onCountryChange(): Observable<any> {
        return this.selectedCountry.asObservable();
    }
    changeCountry(country: string) {
        this.selectedCountry.next( country );
    }

    /**
     * Observable for complete dataset
     * @returns {Observable<any>}
     */
    undataUpdated(): Observable<any> {
        return this.undata.asObservable();
    }
    dataLoaded(data: UNDataRecord[]) {
        console.log('dataLoaded ', typeof data);
        this.undata.next( data );
    }

}
