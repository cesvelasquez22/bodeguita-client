import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProvider } from 'app/core/models/provider.model';
import { EPaymentMethod } from 'app/core/models/paymentMethod.enum';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';
import {
    IPurchaseOrder,
    IPurchaseOrderDetail,
} from '../../models/purchase-order.model';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'app/core/models/product.model';
import { IMeasureUnit } from 'app/core/models/measureUnit.model';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';
import { PurchaseOrderState } from 'app/core/enums/purchaseOrderState.enum';
import { KeyValuePipe } from '@angular/common';

@Component({
    selector: 'purchase-order-create',
    templateUrl: './purchase-order-create.component.html',
    styleUrls: ['./purchase-order-create.component.scss'],
})
export class PurchaseOrderCreateComponent implements OnInit, OnDestroy {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;
    viewModePurchaseOrder: number;
    purchaseOrderId: string;
    currentDate = new Date();

    //
    // ─── RELATED TO FORM ────────────────────────────────────────────────────────────
    //
    purchaseOrderForm: FormGroup;
    paymentMethod = EPaymentMethod;
    // SELECTS
    providers: IProvider[] = [];
    products: IProduct[] = [];
    measureUnits: IMeasureUnit[] = [];
    purchaseOrderProvider: IProvider;
    productSelected: IProduct;

    //
    // ─── RELATED TO DETAILS TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = [
        'Posicion',
        'Idproducto',
        'IdunidadMedida',
        'Cantidad',
        'PrecioCompra',
        'TotalUnidadCompra',
        'Actions',
    ];
    dataSource = new MatTableDataSource<IPurchaseOrderDetail>([]);
    details: IPurchaseOrderDetail[] = [];

    //
    // ─── STATES ─────────────────────────────────────────────────────────────────────
    //
    states = Object.keys(PurchaseOrderState).map((key) => ({
        label: key,
        key: PurchaseOrderState[key],
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
        private purchaseOrderService: PurchaseOrderService,
        private izitoastAlertService: IzitoastAlertService,
        private router: Router
    ) {
        this.buildForm();
        this.purchaseOrderId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.getPurchaseOrderInfo();
        this.onChanges();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private buildForm() {
        this.purchaseOrderForm = this.formBuilder.group({
            IdordenCompra: [0, []],
            FechaEspectativa: [
                new Date(
                    this.currentDate.getFullYear(),
                    this.currentDate.getMonth(),
                    this.currentDate.getDate()
                ),
                [Validators.required],
            ],
            Idproveedor: [null, [Validators.required]],
            Tipo: [null, [Validators.required]],
            SubTotal: [0, []],
            Impuesto: [0, []],
            Total: [0, []],
            DetalleOrdenCompra: new FormArray([]),
            IdestadoOrdenCompra: [0, []],
        });
    }

    onChanges() {
        //
        // ─── PROVIDER CHANGES ────────────────────────────────────────────
        //
        this.purchaseOrderForm.controls.Idproveedor.valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((providerChanges) => {
                if (providerChanges && providerChanges !== null) {
                    this.purchaseOrderProvider = this.providers.find(
                        (provider) => provider.IdProveedor === providerChanges
                    );
                }
            });
    }

    getPurchaseOrderInfo() {
        this.clear();
        this.loading = true;
        if (this.purchaseOrderId) {
            //
            // ─── EDIT ────────────────────────────────────────────────────────
            //
            this.viewModePurchaseOrder = 1;
            const purchaseOrderInfo$: Observable<
                [IProvider[], IProduct[], IMeasureUnit[], IPurchaseOrder]
            > = combineLatest(
                this.mainFacadeService.getProviders(),
                this.mainFacadeService.getProducts(),
                this.mainFacadeService.getMeasureUnits(),
                this.route.params.pipe(
                    switchMap((params: Params) =>
                        this.purchaseOrderService.getPurchaseOrderDetail(
                            params.id
                        )
                    )
                )
            );

            purchaseOrderInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe(
                (data) => {
                    if (data[0] && data[0].length > 0) {
                        this.providers = data[0];
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
            this.viewModePurchaseOrder = 2;
            const purchaseOrderInfo$ = combineLatest(
                this.mainFacadeService.getProviders(),
                this.mainFacadeService.getProducts(),
                this.mainFacadeService.getMeasureUnits()
            );

            purchaseOrderInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe(
                (data) => {
                    if (data[0] && data[0].length > 0) {
                        this.providers = data[0];
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

    setToForm(purchaseOrder: IPurchaseOrder) {
        this.purchaseOrderForm.controls.IdordenCompra.setValue(
            purchaseOrder.IdordenCompra
        );
        this.purchaseOrderForm.controls.Idproveedor.setValue(
            purchaseOrder.Idproveedor
        );
        this.purchaseOrderForm.controls.Tipo.setValue(purchaseOrder.Tipo);
        this.purchaseOrderForm.controls.FechaEspectativa.setValue(
            purchaseOrder.FechaEspectativa
        );
        this.purchaseOrderForm.controls.SubTotal.setValue(
            purchaseOrder.SubTotal
        );
        this.purchaseOrderForm.controls.Impuesto.setValue(
            purchaseOrder.Impuesto
        );
        this.purchaseOrderForm.controls.Total.setValue(purchaseOrder.Total);

        this.purchaseOrderForm.controls.IdestadoOrdenCompra.setValue(
            purchaseOrder.IdestadoOrdenCompra
        );
        //
        // ─── PURCHASE ORDER DETAILS ─────────────────────────────────────────────
        //
        if (purchaseOrder.DetalleOrdenCompra) {
            purchaseOrder.DetalleOrdenCompra.forEach((product) => {
                (this.purchaseOrderForm.controls
                    .DetalleOrdenCompra as FormArray).push(
                    this.createProduct(product)
                );
            });
            this.details = (this.purchaseOrderForm.get(
                'DetalleOrdenCompra'
            ) as FormArray).value;
            this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>(
                this.details
            );
        }
        this.nextOrderState();
    }

    //
    // ─── DELETE ROW PRODUCT DETAIL INVOICE ──────────────────────────────────────────
    //
    deleteProduct(index) {
        (this.purchaseOrderForm.get(
            'DetalleOrdenCompra'
        ) as FormArray).removeAt(index);
        this.details = (this.purchaseOrderForm.get(
            'DetalleOrdenCompra'
        ) as FormArray).value;
        this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>(
            this.details
        );
        this.updateFooterSummary();
    }

    //
    // ─── ADD NEW ROW PRODUCT DETAIL INVOICE ─────────────────────────────────────────
    //
    addProduct() {
        (this.purchaseOrderForm.get('DetalleOrdenCompra') as FormArray).push(
            this.createProduct(null)
        );
        this.details = (this.purchaseOrderForm.get(
            'DetalleOrdenCompra'
        ) as FormArray).value;
        this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>(
            this.details
        );
    }

    createProduct(product?: IPurchaseOrderDetail): FormGroup {
        if (product) {
            const productFinded = this.products.find(
                (item) => item.IDProducto === product.Idproducto
            );
            return this.formBuilder.group({
                IdordenCompra: [product.IdordenCompra, []],
                Idproducto: [product.Idproducto, []],
                IdunidadMedida: [
                    product.IdunidadMedida,
                    [],
                ],
                Cantidad: [product.Cantidad, []],
                PrecioCompra: [
                    productFinded ? productFinded.PrecioCompra : 0,
                    [],
                ],
                TotalUnidadCompra: [product.TotalUnidadCompra, []],
            });
        }

        return this.formBuilder.group({
            IdordenCompra: [0, []],
            Idproducto: [null, []],
            IdunidadMedida: [null, []],
            Cantidad: [null, []],
            PrecioCompra: [null, []],
            TotalUnidadCompra: [null, []],
        });
    }

    clear() {
        this.purchaseOrderForm.controls.FechaEspectativa.setValue(null);
        this.purchaseOrderForm.controls.Idproveedor.setValue(null);
        this.purchaseOrderForm.controls.Tipo.setValue(null);
        this.purchaseOrderForm.controls.SubTotal.setValue(0);
        this.purchaseOrderForm.controls.Impuesto.setValue(0);
        this.purchaseOrderForm.controls.Total.setValue(0);
        (this.purchaseOrderForm.get('DetalleOrdenCompra') as FormArray).clear();
        this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>([]);
    }

    //
    // ─── CALCULATE PURCHASE ORDER DETAIL ────────────────────────────────────────────
    //
    calculateDetailList(index) {
        const item: any = Object.assign(
            {},
            ((this.purchaseOrderForm.controls.DetalleOrdenCompra as FormArray)
                .controls[index] as FormGroup).value
        );
        if (item && item.Idproducto) {
            this.productSelected = this.products.find(
                (product) => product.IDProducto === item.Idproducto
            );
            ((this.purchaseOrderForm.controls.DetalleOrdenCompra as FormArray)
                .controls[index] as FormGroup).controls.PrecioCompra.setValue(
                this.productSelected.PrecioCompra
            );
        }
        if (item && item.Cantidad) {
            item.Cantidad = item.Cantidad * 1;
            ((this.purchaseOrderForm.controls.DetalleOrdenCompra as FormArray)
                .controls[index] as FormGroup).controls.Cantidad.setValue(
                item.Cantidad
            );
            ((this.purchaseOrderForm.controls.DetalleOrdenCompra as FormArray)
                .controls[
                index
            ] as FormGroup).controls.TotalUnidadCompra.setValue(
                item.Cantidad * this.productSelected.PrecioCompra
            );
        }
        this.updateFooterSummary();
    }

    updateFooterSummary() {
        this.details = (this.purchaseOrderForm.get(
            'DetalleOrdenCompra'
        ) as FormArray).value;
        const sumSubtotal = this.details
            .map((t) => {
                if (t && t.TotalUnidadCompra) {
                    return t.TotalUnidadCompra;
                }
                return 0;
            })
            .reduce((acc, value) => acc + value, 0);
        const sumTax = this.details
            .map((t) => {
                if (t && t.TotalUnidadCompra) {
                    return t.TotalUnidadCompra * 0.15;
                }
                return 0;
            })
            .reduce((acc, value) => acc + value, 0);
        const total = sumSubtotal + sumTax;
        this.purchaseOrderForm.controls.SubTotal.setValue(sumSubtotal);
        this.purchaseOrderForm.controls.Impuesto.setValue(sumTax);
        this.purchaseOrderForm.controls.Total.setValue(total);
    }

    inputExpectDate(expectDate: any) {
        this.purchaseOrderForm
            .get('FechaEspectativa')
            .setValue(expectDate.value._d);
    }

    savePurchaseOrder() {
        this.loading = true;
        if (this.purchaseOrderId) {
            //
            // ─── UPDATE ──────────────────────────────────────────────────────
            //
            const purchaseOrder: IPurchaseOrder = this.purchaseOrderForm.value;
            this.purchaseOrderService
                .updatePurchaseOrder(purchaseOrder)
                .subscribe(
                    (response) => {
                        this.izitoastAlertService.CustomSuccessAlert(response);
                        this.loading = false;
                        this.router.navigate(['/admin/orders/purchase-orders']);
                    },
                    (err) => {
                        this.izitoastAlertService.CustomErrorAlert(
                            'Hubo un error intentando actualizar la orden de compra'
                        );
                        this.loading = false;
                    }
                );
        } else {
            //
            // ─── SAVE ────────────────────────────────────────────────────────
            //
            const newPurchaseOrder: IPurchaseOrder = this.purchaseOrderForm
                .value;
            this.purchaseOrderService
                .createPurchaseOrder(newPurchaseOrder)
                .subscribe(
                    (response) => {
                        this.izitoastAlertService.CustomSuccessAlert(response);
                        this.loading = false;
                        this.router.navigate(['/admin/orders/purchase-orders']);
                    },
                    (err) => {
                        this.izitoastAlertService.CustomErrorAlert(
                            'Hubo un error intentando crear la orden de compra'
                        );
                        this.loading = false;
                    }
                );
        }
    }

    annulPurchaseOrder() {
        if (this.purchaseOrderId) {
            //
            // ─── ANNUL ──────────────────────────────────────────────────────
            //
            const purchaseOrder: IPurchaseOrder = this.purchaseOrderForm.value;
            this.purchaseOrderService
                .annulPurchaseOrder(purchaseOrder)
                .subscribe(
                    (response) => {
                        this.izitoastAlertService.CustomSuccessAlert(response);
                        this.loading = false;
                        this.router.navigate(['/admin/orders/purchase-orders']);
                    },
                    (err) => {
                        this.izitoastAlertService.CustomErrorAlert(
                            'Hubo un error intentando anular la orden de compra'
                        );
                        this.loading = false;
                    }
                );
        }
    }

    get IdestadoOrdenCompra(): number {
        return this.purchaseOrderForm.controls.IdestadoOrdenCompra.value;
    }

    nextOrderState(): string {
        this.nextState = this.states[this.IdestadoOrdenCompra].key;
        return this.states[this.IdestadoOrdenCompra].label;
    }
}
