import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GridApi, GridOptions, GridReadyEvent} from 'ag-grid';
import {MessageService} from '../../services/message.service';
import {Subscription} from 'rxjs';
import {UNDataRecord, UNUniqueDataRecord} from '../../model/UNDataModel';
import { Slider}

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
    rowSelection;
    private selectedCountry = 'all';

    columnDefs = [
        {
            headerName: 'Country',
            field: 'Country or Area',
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
            },
            floatingFilter: true
        },
        {
            headerName: 'Year', field: 'Year', minWidth: 30
        },
        {
            headerName: 'Population', field: 'Value', minWidth: 30, suppressFilter:true
        },
        {
            headerName: 'Area', field: 'Area', minWidth: 30
        },
        {
            headerName: 'Sex', field: 'Sex', minWidth: 30
        },
        {
            headerName: 'Record Type', field: 'Record Type', hide: true
        },
        {
            headerName: 'Reliability', field: 'Reliability', hide: true
        },
        {
            headerName: 'Source Year', field: 'Source Year', minWidth: 30
        },
        {
            headerName: 'Value Footnotes', field: 'Value Footnotes', hide: true
        }
    ];

    gridOptions: any = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        showToolPanel: true,
        enableFilter: true,
        enableColResize: true,
        isExternalFilterPresent: this.isExternalFilterPresent.bind(this),
        doesExternalFilterPass: this.doesExternalFilterPass.bind(this),
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

        window.addEventListener('resize', function () {
            setTimeout(function () {
                console.log('resize ');
                params.api.sizeColumnsToFit();
            }, 5000);
        });
    }

    onModelUpdated() {
        console.log('onModelUpdated ');
        if (this.gridOptions.api && this.columnDefs) {
            this.gridOptions.columnApi.autoSizeColumns(this.columnDefs);
        }
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
