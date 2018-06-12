import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounce} from 'rxjs/internal/operators';
import {UnDataService} from './services/un-data-service.service';
import {UNDataRecord, UNUniqueDataRecord} from './model/UNDataModel';
import {MessageService} from './services/message.service';
import {COUNTRY_CODES as codes} from './shared/country-codes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    undata: UNDataRecord[];
    uniqueCountries: string[] ;
    uniqueCountryData: UNUniqueDataRecord[] = [];

    constructor(private unDataService: UnDataService,
                private messageService: MessageService)  { }

    ngOnInit(): void {

        this.unDataService.getData()
            .subscribe(d => {
                this.undata = (d as any).places;
                this.uniqueCountries = [...new Set(this.undata.map(item => item['Country or Area']))];

                for (const country of this.uniqueCountries) {
                    this.uniqueCountryData.push({'Country or Area': country, 'countryID': 'gb', 'flagSrc': (codes[country])});
                    console.log('codes ', codes[country]);
                }
                this.messageService.sendCountries(this.uniqueCountryData);
                this.messageService.dataLoaded(this.undata);
            });

        // debounce the row selection events - only pass the selected rows after 20ms
        // TODO this.selectEventsObserver = this.selectionEventSubject.pipe(debounce(() => timer(20)));
        // debounce the row selection events - only pass the selected rows after 20ms
        // this.selectEventsObserver = this.selectionEventSubject.pipe(debounce(() => timer(20)));
        /* this.selectEventsObserver.subscribe(rowNodes => {
          this.setBarChartData(rowNodes);
        ); */
    }
    ngOnDestroy() {
        // TODO unsubscribe to ensure no memory leaks
    }


}
