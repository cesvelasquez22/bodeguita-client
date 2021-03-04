import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EPaymentMethod } from 'app/core/models/paymentMethod.enum';
import { IProduct } from 'app/core/models/product.model';
import { ICustomer } from 'app/core/models/customer.model';
import { IMeasureUnit } from 'app/core/models/measureUnit.model';
import { MatTableDataSource } from '@angular/material/table';
import { ISaleOrderDetail } from '../../models/sale-order';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SaleOrderService } from '../../services/sale-order.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-sale-order-create',
    templateUrl: './sale-order-create.component.html',
    styleUrls: ['./sale-order-create.component.scss'],
})
export class SaleOrderCreateComponent implements OnInit {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;
    viewModeSaleOrder: number;
    saleOrderId: string;
    currentDate = new Date();

    //
    // ─── RELATED TO FORM ────────────────────────────────────────────────────────────
    //
    saleOrderForm: FormGroup;
    paymentMethod = EPaymentMethod;
    // SELECTS
    customers: ICustomer[] = [];
    products: IProduct[] = [];
    measureUnits: IMeasureUnit[] = [];
    saleOrderCustomer: ICustomer;
    productSelected: IProduct;

    //
    // ─── RELATED TO DETAILS TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = [
        'Posicion',
        'IDProducto',
        'IDUnidadMedida',
        'Cantidad',
        'PrecioVenta',
        'TotalUnidadVenta',
        'Actions',
    ];
    dataSource = new MatTableDataSource<ISaleOrderDetail>([]);
    details: ISaleOrderDetail[] = [];

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private saleOrderService: SaleOrderService
    ) {
        this.buildForm();
        this.saleOrderId = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.saleOrderForm = this.formBuilder.group({
            idOrdenVenta: [0, [Validators.required]],
            fechaSalida: [null, [Validators.required]],
            IdCliente: [null, [Validators.required]],
            Tipo: [null, [Validators.required]],
            IdEstadoOrdenVenta: [1, [Validators.required]],
            IdDescuento: [null, []],
            SubTotal: [0, []],
            MontoDescuento: [0, []],
            Impuesto: [0, []],
            Total: [0, []],
            detalleOrdenVenta: new FormArray([]),
        });
    }

    ngOnInit(): void {
        this.getPurchaseOrderInfo();
    }

    getPurchaseOrderInfo() {
        this.loading = true;
        if (this.saleOrderId) {
            //
            // ─── EDIT ────────────────────────────────────────────────────────
            //
            this.viewModeSaleOrder = 1;
            this.loading = false;
        } else {
            //
            // ─── CREATE ──────────────────────────────────────────────────────
            //
            this.viewModeSaleOrder = 2;
            const saleOrderInfo$: Observable<
                [ICustomer[], IProduct[], IMeasureUnit[]]
            > = combineLatest(
                this.saleOrderService.getCustomers(),
                this.saleOrderService.getProducts(),
                this.saleOrderService.getMeasureUnits()
            );

            saleOrderInfo$
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((data) => {
                    console.log(data);
                    if (data[0] && data[0].length > 0) {
                        this.customers = data[0];
                    }

                    if (data[1] && data[1].length > 0) {
                        this.products = data[1];
                    }

                    if (data[2] && data[2].length > 0) {
                        this.measureUnits = data[2];
                    }
                });
            this.loading = false;
        }
    }

    onChanges() {
        //
        // ─── CUSTOMER CHANGES ────────────────────────────────────────────
        //
        this.saleOrderForm.controls.IdCliente.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((customerChanges) => {
                if (customerChanges && customerChanges !== null) {
                    this.saleOrderCustomer = this.customers.find(
                        (customer) => customer.IdCliente === customerChanges
                    );
                }
            });
    }

    get IdDescuento(): number {
        return this.saleOrderForm.controls.IdDescuento.value;
    }

    //
    // ─── DELETE ROW PRODUCT DETAIL INVOICE ──────────────────────────────────────────
    //
    deleteProduct(index) {
        (this.saleOrderForm.get('detalleOrdenVenta') as FormArray).removeAt(
            index
        );
        this.details = (this.saleOrderForm.get(
            'detalleOrdenVenta'
        ) as FormArray).value;
        this.dataSource = new MatTableDataSource<ISaleOrderDetail>(
            this.details
        );
        // this.updateFooterSummary();
    }

    //
    // ─── ADD NEW ROW PRODUCT DETAIL INVOICE ─────────────────────────────────────────
    //
    addProduct() {
        (this.saleOrderForm.get('detalleOrdenVenta') as FormArray).push(
            this.createProduct()
        );
        this.details = (this.saleOrderForm.get(
            'detalleOrdenVenta'
        ) as FormArray).value;
        this.dataSource = new MatTableDataSource<ISaleOrderDetail>(
            this.details
        );
    }

    createProduct(): FormGroup {
        return this.formBuilder.group({
            IDProducto: [null, []],
            IDUnidadMedida: [null, []],
            Cantidad: [null, []],
            TotalUnidadVenta: [null, []],
        });
    }

    //
    // ─── CALCULATE SALE ORDER DETAIL ────────────────────────────────────────────
    //
    calculateDetailList(index) {
        const item: ISaleOrderDetail = Object.assign(
            {},
            ( (
                (this.saleOrderForm.controls.detalleOrdenVenta as FormArray).controls[index]
            ) as FormGroup).value
        );
        if (item && item.IDProducto) {
            this.productSelected = this.products.find(product => product.IDProducto === item.IDProducto);
        }
        if (item && item.Cantidad) {
            item.Cantidad = item.Cantidad * 1;
            ( (
                ( this.saleOrderForm.controls.detalleOrdenVenta as FormArray).controls[index]
            ) as FormGroup).controls.Cantidad.setValue(item.Cantidad);
            ( (
                ( this.saleOrderForm.controls.detalleOrdenVenta as FormArray).controls[index]
            ) as FormGroup).controls.TotalUnidadVenta.setValue(item.Cantidad * this.productSelected.PrecioVenta);
        }
        this.updateFooterSummary();
    }

    updateFooterSummary() {
        this.details = (this.saleOrderForm.get('detalleOrdenVenta') as FormArray).value;
        const sumSubtotal = this.details
            .map((t) => {
                if (t && t.TotalUnidadVenta) {
                    return t.TotalUnidadVenta;
                }
                return 0;
            })
            .reduce((acc, value) => acc + value, 0);
        const sumDiscount = this.details
            .map((t) => {
                if (t && t.TotalUnidadVenta && this.IdDescuento) {
                    return t.TotalUnidadVenta * this.IdDescuento;
                }
                return 0;
            })
            .reduce((acc, value) => acc + value, 0);
        const sumTax = this.details
            .map((t) => {
                if (t && t.TotalUnidadVenta) {
                    return t.TotalUnidadVenta * 0.15;
                }
                return 0;
            })
            .reduce((acc, value) => acc + value, 0);
        const total = (sumSubtotal + sumTax) - sumDiscount;
        this.saleOrderForm.controls.SubTotal.setValue(sumSubtotal);
        this.saleOrderForm.controls.MontoDescuento.setValue(sumDiscount);
        this.saleOrderForm.controls.Impuesto.setValue(sumTax);
        this.saleOrderForm.controls.Total.setValue(total);
    }

    clear() {
        this.saleOrderForm.controls.fechaSalida.setValue(null);
        this.saleOrderForm.controls.IdCliente.setValue(null);
        this.saleOrderForm.controls.Tipo.setValue(null);
        this.saleOrderForm.controls.IdEstadoOrdenVenta.setValue(null);
        this.saleOrderForm.controls.IdDescuento.setValue(null);
        this.saleOrderForm.controls.SubTotal.setValue(0);
        this.saleOrderForm.controls.MontoDescuento.setValue(0);
        this.saleOrderForm.controls.Impuesto.setValue(0);
        this.saleOrderForm.controls.Total.setValue(0);
        (this.saleOrderForm.get('detalleOrdenVenta') as FormArray).clear();
        this.dataSource = new MatTableDataSource<ISaleOrderDetail>([]);
    }

    inputExpectOutDate(outDate: any) {
        this.saleOrderForm.get('fechaSalida').setValue(outDate.value._d);
    }

    saveSaleOrder() {
        console.log(this.saleOrderForm.value);
    }
}
