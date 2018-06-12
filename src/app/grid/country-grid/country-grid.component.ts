import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UNUniqueDataRecord} from '../../model/UNDataModel';
import {UnDataService} from '../../services/un-data-service.service';
import {GridOptions, GridApi, GridReadyEvent} from 'ag-grid';
import {Subscription} from 'rxjs';
import {MessageService} from '../../services/message.service';

@Component({
    selector: 'app-country-grid',
    templateUrl: './country-grid.component.html',
    styleUrls: ['./country-grid.component.scss']
})
export class CountryGridComponent implements OnInit, OnDestroy {

    @Input() rowData;
    public gridOptions: GridOptions;
    public rowSelection;
    private _api: GridApi;
    private _subscription: Subscription;

    columnDefs = [
        {headerName: '', field: 'flagSrc', cellRenderer: this.flagCellRenderer, width: 50, suppressFilter: true},
        {
            headerName: 'Country',
            field: 'Country or Area',
            filter: 'agTextColumnFilter'
        }
    ];

    constructor(private unDataService: UnDataService, private messageService: MessageService) {
        this.rowSelection = 'single';
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this._subscription.unsubscribe();
    }

    sendMessage(): void {
    }

    clearMessage(): void {
    }

    reload() {
        this._api.redrawRows();
    }

    ngOnInit(): void {
        this._subscription = this.messageService.countryListUpdate().subscribe(countryArray => {
            this._api.setRowData(countryArray as UNUniqueDataRecord[]);
        });
    }

    onRowSelected(event) {
        // console.log('onRowSelected ', event);
        if (event.node && event.node.data && event.node.selected) {
            // console.log('*** messageService.changeCountry ');
            this.messageService.changeCountry(event.node.data['Country or Area'] as string);
        }
    }

    onSelectionChanged(event) {
        // console.log('onSelectionChanged ', event.node);
    }

    onGridReady(params: GridReadyEvent) {
        this._api = params.api;
    }

    gridSizeChanged(event) {
        console.log('gridSizeChanged ', event);
    }

    flagCellRenderer(params) {
        return '<img style="height: 20px; width: auto;" src="../assets/flags/'
            + (params.value !== undefined ? params.value.toLowerCase() : 'error') + '.png">';
    }

}




