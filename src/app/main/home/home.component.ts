import { Component, OnInit } from '@angular/core';
import { IWidgetData } from './models/widget.data';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    dateNow = Date.now();

    constructor() {
        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);
    }

    widgetData: IWidgetData[] = [
        {
            title: 'Usuarios',
            statsNumber: 135,
            numberFg: 'light-blue-fg',
        },
        {
            title: 'Ordenes de venta',
            statsNumber: 325,
            numberFg: 'red-fg',
        },
        {
            title: 'Productos únicos',
            statsNumber: 200,
            numberFg: 'orange-fg',
        },
        {
            title: 'Ventas emitidas',
            statsNumber: 158,
            numberFg: 'blue-grey-fg',
        },
    ];

    ngOnInit(): void {}
}
