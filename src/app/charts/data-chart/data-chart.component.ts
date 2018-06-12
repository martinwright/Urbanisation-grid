import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GridApi, GridOptions, GridReadyEvent} from 'ag-grid';
import {MessageService} from '../../services/message.service';
import {Subscription} from 'rxjs';
import {UNDataRecord, UNUniqueDataRecord} from '../../model/UNDataModel';

@Component({
    selector: 'app-data-chart',
    templateUrl: './data-chart.component.html',
    styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent implements OnInit, OnDestroy {

    @Input() rowData;
    private subscription: Subscription;
    private gridApi: GridApi;
    private gridColumnApi;
    private rowSelection;
    private selectedCountry = 'all';

    columnDefs = [
        {
            headerName: 'Country',
            field: 'Country or Area',
            width: 20,
            hide: true,
            filter: 'agTextColumnFilter',
            filterParams: {
                comparator: function (cellValue) {
                    console.log('*** cellValue ', cellValue);
                    const dateAsString = cellValue;
                    if (dateAsString === 'Albania') {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        },
        {headerName: 'Value', field: 'Value',
            width: 90,
            minWidth: 50,
            maxWidth: 100},
        {headerName: 'Year', field: 'Year',
            width: 90,
            minWidth: 50,
            maxWidth: 100},
        {headerName: 'Area', field: 'Area',
            width: 90,
            minWidth: 50,
            maxWidth: 100},
        {headerName: 'Sex', field: 'Sex',
            width: 90,
            minWidth: 50,
            maxWidth: 100},
        {headerName: 'Record Type', field: 'Record Type',
            width: 90,
            minWidth: 50,
            maxWidth: 100},
        {headerName: 'Reliability', field: 'Reliability',
            width: 90,
            minWidth: 50,
            maxWidth: 100},
        {headerName: 'Source Year', field: 'Source Year',
            width: 90,
            minWidth: 50,
            maxWidth: 100},
        {headerName: 'Value Footnotes', field: 'Value Footnotes', hide: true,
            width: 90,
            minWidth: 50,
            maxWidth: 100}
    ];

    private gridOptions: any = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        enableFilter: true,
        isExternalFilterPresent: this.isExternalFilterPresent.bind(this),
        doesExternalFilterPass: this.doesExternalFilterPass.bind(this)
    };

    isExternalFilterPresent() {
        return this.selectedCountry !== 'all';
    }

    doesExternalFilterPass(node) {
        return (node.data['Country or Area'] === this.selectedCountry);
    }

    constructor(private messageService: MessageService) {
        // console.log('*** constructor ');
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    onGridReady(params: GridReadyEvent) {
        // console.log('*** onGridReady ');
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.subscription = this.messageService.undataUpdated().subscribe(message => {
            // console.log('message ', typeof message);
            // console.log('message ', message);
            this.gridApi.setRowData(message as UNDataRecord[]);
        });

        this.subscription = this.messageService.onCountryChange().subscribe(message => {
            // console.log('message ', typeof message);
            // console.log('message ', message);
            this.onCountryChange(message as string);
        });

        params.api.sizeColumnsToFit();
    }

    ngOnInit() {
        console.log('*** ngOnInit ');
    }

    onCountryChange(country: string) {
        // console.log('onCountryChange ', country);
        if (this.selectedCountry !== country) {
            this.selectedCountry = country;
            this.gridApi.onFilterChanged();
        }
    }

}
