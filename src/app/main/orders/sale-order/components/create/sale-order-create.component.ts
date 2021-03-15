import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { EPaymentMethod } from 'app/core/models/paymentMethod.enum';
import { IProduct } from 'app/core/models/product.model';
import { ICustomer } from 'app/core/models/customer.model';
import { IMeasureUnit } from 'app/core/models/measureUnit.model';
import { MatTableDataSource } from '@angular/material/table';
import { ISaleOrder, ISaleOrderDetail } from '../../models/sale-order';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SaleOrderService } from '../../services/sale-order.service';
import { SaleOrderState } from 'app/core/enums/saleOrderState.enum';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';

@Component({
    selector: 'app-sale-order-create',
    templateUrl: './sale-order-create.component.html',
    styleUrls: ['./sale-order-create.component.scss'],
})
export class SaleOrderCreateComponent implements OnInit, OnDestroy {
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
        'Idproducto',
        'IdunidadMedida',
        'Cantidad',
        'PrecioVenta',
        'TotalUnidadVenta',
        'Actions',
    ];
    dataSource = new MatTableDataSource<ISaleOrderDetail>([]);
    details: ISaleOrderDetail[] = [];

    //
    // ─── STATES ─────────────────────────────────────────────────────────────────────
    //
    states = Object.keys(SaleOrderState).map((key) => ({
        label: key,
        key: SaleOrderState[key],
    }));
    nextState: string;

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private mainFacadeService: MainFacadeService,
        private saleOrderService: SaleOrderService,
        private izitoastAlertService: IzitoastAlertService,
        private router: Router
    ) {
        this.buildForm();
        this.saleOrderId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.getSaleOrderInfo();
        this.onChanges();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private buildForm() {
        this.saleOrderForm = this.formBuilder.group({
            IdordenVenta: [0, []],
            FechaSalida: [
                new Date(
                    this.currentDate.getFullYear(),
                    this.currentDate.getMonth(),
                    this.currentDate.getDate()
                ),
                [Validators.required],
            ],
            Idcliente: [null, [Validators.required]],
            Tipo: [null, [Validators.required]],
            // IdDescuento: [0, []],
            SubTotal: [0, []],
            // MontoDescuento: [0, []],
            Impuesto: [0, []],
            Total: [0, []],
            DetalleOrdenVenta: new FormArray([]),
            IdestadoOrdenVenta: [0, []],
        });
    }

    onChanges() {
        //
        // ─── CUSTOMER CHANGES ────────────────────────────────────────────
        //
        this.saleOrderForm.controls.Idcliente.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((customerChanges) => {
                if (customerChanges && customerChanges !== null) {
                    this.saleOrderCustomer = this.customers.find(
                        (customer) => customer.IdCliente === customerChanges
                    );
                }
            });
    }

    getSaleOrderInfo() {
        this.clear();
        this.loading = true;
        if (this.saleOrderId) {
            //
            // ─── EDIT ────────────────────────────────────────────────────────
            //
            this.viewModeSaleOrder = 1;
            const saleOrderInfo$: Observable<
                [ICustomer[], IProduct[], IMeasureUnit[], ISaleOrder]
            > = combineLatest(
                this.mainFacadeService.getCustomers(),
                this.mainFacadeService.getProducts(),
                this.mainFacadeService.getMeasureUnits(),
                this.route.params.pipe(
                    switchMap((params: Params) =>
                        this.saleOrderService.getSaleOrderDetail(params.id)
                    )
                )
            );

            saleOrderInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe(
                (data) => {
                    if (data[0] && data[0].length > 0) {
                        this.customers = data[0];
                    }

                    if (data[1] && data[1].length > 0) {
                        this.products = data[1];
                    }

                    if (data[2] && data[2].length > 0) {
                        this.measureUnits = data[2];
                    }

                    if (data[3] && data[3] !== null) {
                        this.setToForm(data[3]);
                    }
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
        } else {
            //
            // ─── CREATE ──────────────────────────────────────────────────────
            //
            this.viewModeSaleOrder = 2;
            const saleOrderInfo$: Observable<
                [ICustomer[], IProduct[], IMeasureUnit[]]
            > = combineLatest(
                this.mainFacadeService.getCustomers(),
                this.mainFacadeService.getProducts(),
                this.mainFacadeService.getMeasureUnits()
            );

            saleOrderInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe(
                (data) => {
                    if (data[0] && data[0].length > 0) {
                        this.customers = data[0];
                    }

                    if (data[1] && data[1].length > 0) {
                        this.products = data[1];
                    }

                    if (data[2] && data[2].length > 0) {
                        this.measureUnits = data[2];
                    }
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
        }
    }

    setToForm(saleOrder: ISaleOrder) {
        this.saleOrderForm.controls.IdordenVenta.setValue(
            saleOrder.IdordenVenta
        );
        this.saleOrderForm.controls.Idcliente.setValue(saleOrder.Idcliente);
        this.saleOrderForm.controls.Tipo.setValue(saleOrder.Tipo);
        this.saleOrderForm.controls.FechaSalida.setValue(saleOrder.FechaSalida);
        this.saleOrderForm.controls.SubTotal.setValue(saleOrder.SubTotal);
        this.saleOrderForm.controls.Impuesto.setValue(saleOrder.Impuesto);
        this.saleOrderForm.controls.Total.setValue(saleOrder.Total);

        this.saleOrderForm.controls.IdestadoOrdenVenta.setValue(
            saleOrder.IdestadoOrdenVenta
        );
        //
        // ─── PURCHASE ORDER DETAILS ─────────────────────────────────────────────
        //
        if (saleOrder.DetalleOrdenVenta) {
            saleOrder.DetalleOrdenVenta.forEach((product) => {
                (this.saleOrderForm.controls
                    .DetalleOrdenVenta as FormArray).push(
                    this.createProduct(product)
                );
            });
            this.details = (this.saleOrderForm.get(
                'DetalleOrdenVenta'
            ) as FormArray).value;
            this.dataSource = new MatTableDataSource<ISaleOrderDetail>(
                this.details
            );
        }
        this.nextOrderState();
    }

    // get IdDescuento(): number {
    //     return this.saleOrderForm.controls.IdDescuento.value;
    // }

    //
    // ─── DELETE ROW PRODUCT DETAIL INVOICE ──────────────────────────────────────────
    //
    deleteProduct(index) {
        (this.saleOrderForm.get('DetalleOrdenVenta') as FormArray).removeAt(
            index
        );
        this.details = (this.saleOrderForm.get(
            'DetalleOrdenVenta'
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
        (this.saleOrderForm.get('DetalleOrdenVenta') as FormArray).push(
            this.createProduct()
        );
        this.details = (this.saleOrderForm.get(
            'DetalleOrdenVenta'
        ) as FormArray).value;
        this.dataSource = new MatTableDataSource<ISaleOrderDetail>(
            this.details
        );
    }

    createProduct(product?: ISaleOrderDetail): FormGroup {
        if (product) {
            const productFinded = this.products.find(
                (item) => item.IDProducto === product.Idproducto
            );
            return this.formBuilder.group({
                IdordenVenta: [product.IdordenVenta, []],
                Idproducto: [product.Idproducto, []],
                IdunidadMedida: [product.IdunidadMedida, []],
                Cantidad: [product.Cantidad, []],
                PrecioVenta: [
                    productFinded ? productFinded.PrecioVenta : 0,
                    [],
                ],
                TotalUnidadVenta: [product.TotalUnidadVenta, []],
            });
        }

        return this.formBuilder.group({
            IdordenVenta: [0, []],
            Idproducto: [null, []],
            IdunidadMedida: [null, []],
            Cantidad: [null, []],
            PrecioVenta: [null, []],
            TotalUnidadVenta: [null, []],
        });
    }

    clear() {
        this.saleOrderForm.controls.FechaSalida.setValue(null);
        this.saleOrderForm.controls.Idcliente.setValue(null);
        this.saleOrderForm.controls.Tipo.setValue(null);
        this.saleOrderForm.controls.IdestadoOrdenVenta.setValue(null);
        // this.saleOrderForm.controls.IdDescuento.setValue(null);
        this.saleOrderForm.controls.SubTotal.setValue(0);
        // this.saleOrderForm.controls.MontoDescuento.setValue(0);
        this.saleOrderForm.controls.Impuesto.setValue(0);
        this.saleOrderForm.controls.Total.setValue(0);
        (this.saleOrderForm.get('DetalleOrdenVenta') as FormArray).clear();
        this.dataSource = new MatTableDataSource<ISaleOrderDetail>([]);
    }

    //
    // ─── CALCULATE SALE ORDER DETAIL ────────────────────────────────────────────
    //
    calculateDetailList(index) {
        const item: ISaleOrderDetail = Object.assign(
            // considerar any
            {},
            ((this.saleOrderForm.controls.DetalleOrdenVenta as FormArray)
                .controls[index] as FormGroup).value
        );
        if (item && item.Idproducto) {
            this.productSelected = this.products.find(
                (product) => product.IDProducto === item.Idproducto
            );
            ((this.saleOrderForm.controls.DetalleOrdenVenta as FormArray)
                .controls[index] as FormGroup).controls.PrecioVenta.setValue(
                this.productSelected.PrecioVenta
            );
        }
        if (item && item.Cantidad) {
            item.Cantidad = item.Cantidad * 1;
            ((this.saleOrderForm.controls.DetalleOrdenVenta as FormArray)
                .controls[index] as FormGroup).controls.Cantidad.setValue(
                item.Cantidad
            );
            ((this.saleOrderForm.controls.DetalleOrdenVenta as FormArray)
                .controls[
                index
            ] as FormGroup).controls.TotalUnidadVenta.setValue(
                item.Cantidad * this.productSelected.PrecioVenta
            );
        }
        this.updateFooterSummary();
    }

    updateFooterSummary() {
        this.details = (this.saleOrderForm.get(
            'DetalleOrdenVenta'
        ) as FormArray).value;
        const sumSubtotal = this.details
            .map((t) => {
                if (t && t.TotalUnidadVenta) {
                    return t.TotalUnidadVenta;
                }
                return 0;
            })
            .reduce((acc, value) => acc + value, 0);
        // const sumDiscount = this.details
        //     .map((t) => {
        //         if (t && t.TotalUnidadVenta && this.IdDescuento) {
        //             return t.TotalUnidadVenta * this.IdDescuento;
        //         }
        //         return 0;
        //     })
        //     .reduce((acc, value) => acc + value, 0);
        const sumTax = this.details
            .map((t) => {
                if (t && t.TotalUnidadVenta) {
                    return t.TotalUnidadVenta * 0.15;
                }
                return 0;
            })
            .reduce((acc, value) => acc + value, 0);
        const total = sumSubtotal + sumTax;
        this.saleOrderForm.controls.SubTotal.setValue(sumSubtotal);
        // this.saleOrderForm.controls.MontoDescuento.setValue(sumDiscount);
        this.saleOrderForm.controls.Impuesto.setValue(sumTax);
        this.saleOrderForm.controls.Total.setValue(total);
    }

    inputExpectOutDate(outDate: any) {
        this.saleOrderForm.get('FechaSalida').setValue(outDate.value._d);
    }

    saveSaleOrder() {
        this.loading = true;
        if (this.saleOrderId) {
            //
            // ─── UPDATE ──────────────────────────────────────────────────────
            //
            const saleOrder: ISaleOrder = this.saleOrderForm.value;
            this.saleOrderService.updateSaleOrder(saleOrder).subscribe(
                (response) => {
                    this.izitoastAlertService.CustomSuccessAlert(response);
                    this.loading = false;
                    this.router.navigate(['/admin/orders/sales-orders']);
                },
                (err) => {
                    this.izitoastAlertService.CustomErrorAlert(
                        'Hubo un error intentando actualizar la orden de venta'
                    );
                    this.loading = false;
                }
            );
        } else {
            //
            // ─── SAVE ────────────────────────────────────────────────────────
            //
            const newSaleOrder: ISaleOrder = this.saleOrderForm.value;
            this.saleOrderService.createSaleOrder(newSaleOrder).subscribe(
                (response) => {
                    this.izitoastAlertService.CustomSuccessAlert(response);
                    this.loading = false;
                    this.router.navigate(['/admin/orders/sales-orders']);
                },
                (err) => {
                    this.izitoastAlertService.CustomErrorAlert(
                        'Hubo un error intentando crear la orden de venta'
                    );
                    this.loading = false;
                }
            );
        }
    }

    annulSaleOrder() {
        if (this.saleOrderId) {
            //
            // ─── ANNUL ──────────────────────────────────────────────────────
            //
            const saleOrder: ISaleOrder = this.saleOrderForm.value;
            this.saleOrderService
                .annulSaleOrder(saleOrder)
                .subscribe(
                    (response) => {
                        this.izitoastAlertService.CustomSuccessAlert(response);
                        this.loading = false;
                        this.router.navigate(['/admin/orders/sales-orders']);
                    },
                    (err) => {
                        this.izitoastAlertService.CustomErrorAlert(
                            'Hubo un error intentando anular la orden de venta'
                        );
                        this.loading = false;
                    }
                );
        }
    }

    get IdestadoOrdenVenta(): number {
        return this.saleOrderForm.controls.IdestadoOrdenVenta.value;
    }

    nextOrderState(): string {
        if (this.IdestadoOrdenVenta && this.IdestadoOrdenVenta !== 3) {
            this.nextState = this.states[this.IdestadoOrdenVenta].key;
            return this.states[this.IdestadoOrdenVenta].label;
        }
    }
}
