import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IBestSale } from '../../models/best-sale.model';

@Component({
    selector: 'app-best-sales',
    templateUrl: './best-sales.component.html',
    styleUrls: ['./best-sales.component.scss'],
})
export class BestSalesComponent implements OnInit {
    //
    // ─── RELATED TO TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = ['#', 'Producto', 'Cliente', 'Total', 'Fecha'];
    dataSource = new MatTableDataSource<IBestSale>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    currentDate = new Date();

    bestSales: IBestSale[] = [
        {
            product: 'Coca Cola',
            customer: 'Luis Aragónes',
            total: 15000,
            date: new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                2
            ),
        },
        {
            product: 'Cerveza Salva Vida',
            customer: 'Victor Munguía',
            total: 13500,
            date: new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                5
            ),
        },
        {
            product: 'Agua Dasani',
            customer: 'Wanda Maximoff',
            total: 12800,
            date: new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                1
            ),
        },
        {
            product: 'Gaseosas de sabores',
            customer: 'Lupe Umanzor',
            total: 11300,
            date: new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                8
            ),
        },
        {
            product: 'Jugos Del Valle',
            customer: 'Antonio Sarosi',
            total: 10700,
            date: new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth() + 1,
                0
            ),
        },
    ];

    constructor() {}

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<IBestSale>(
            this.bestSales
        );
        this.dataSource.paginator = this.paginator;
    }
}
