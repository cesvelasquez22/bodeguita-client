import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProvider } from 'app/core/models/provider.model';
import { EPaymentMethod } from 'app/core/models/paymentMethod.enum';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';
import { IPurchaseOrder, IPurchaseOrderDetail } from '../../models/purchase-order.model';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'app/core/models/product.model';
import { IMeasureUnit } from 'app/core/models/measureUnit.model';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';

@Component({
    selector: 'purchase-order-create',
    templateUrl: './purchase-order-create.component.html',
    styleUrls: ['./purchase-order-create.component.scss'],
})
export class PurchaseOrderCreateComponent implements OnInit {
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
        'IDProducto',
        'IDUnidadMedida',
        'Cantidad',
        'PrecioCompra',
        'TotalUnidadCompra',
        'Actions',
    ];
    dataSource = new MatTableDataSource<IPurchaseOrderDetail>([]);
    details: IPurchaseOrderDetail[] = [];

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
        private router: Router,
    ) {
        this.buildForm();
        this.purchaseOrderId = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.purchaseOrderForm = this.formBuilder.group({
            FechaEspectativa: [null, [Validators.required]],
            Idproveedor: [null, [Validators.required]], 
            Tipo: [null, [Validators.required]],
            IdestadoOrdenCompra: [1, [Validators.required]],
            SubTotal: [0, []],
            Impuesto: [0, []],
            Total: [0, []],
            detalleOrdenCompra: new FormArray([]),
        });
    }

    ngOnInit(): void {
        this.getPurchaseOrderInfo();
        this.onChanges();
    }

    getPurchaseOrderInfo() {
        this.loading = true;
        if (this.purchaseOrderId) {
            //
            // ─── EDIT ────────────────────────────────────────────────────────
            //
            this.viewModePurchaseOrder = 1;
            this.loading = false;
        } else {
            //
            // ─── CREATE ──────────────────────────────────────────────────────
            //
            this.viewModePurchaseOrder = 2;
            const purchaseOrderInfo$: Observable<[IProvider[], IProduct[], IMeasureUnit[]]> = combineLatest(
                this.mainFacadeService.getProviders(),
                this.mainFacadeService.getProducts(),
                this.mainFacadeService.getMeasureUnits(),
            );

            purchaseOrderInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
                if (data[0] && data[0].length > 0) {
                    this.providers = data[0];
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
        // ─── PROVIDER CHANGES ────────────────────────────────────────────
        //
        this.purchaseOrderForm.controls.Idproveedor.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(providerChanges => {
            if (providerChanges && providerChanges !== null) {
                this.purchaseOrderProvider = this.providers.find(provider => provider.IdProveedor === providerChanges);
            }
        });
    }

    //
    // ─── DELETE ROW PRODUCT DETAIL INVOICE ──────────────────────────────────────────
    //
    deleteProduct(index) {
        (this.purchaseOrderForm.get('detalleOrdenCompra') as FormArray).removeAt(index);
        this.details = (this.purchaseOrderForm.get('detalleOrdenCompra') as FormArray).value;
        this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>(this.details);
        // this.updateFooterSummary();
    }

    //
    // ─── ADD NEW ROW PRODUCT DETAIL INVOICE ─────────────────────────────────────────
    //
    addProduct() {
        (this.purchaseOrderForm.get('detalleOrdenCompra') as FormArray).push(
            this.createProduct()
        );
        this.details = (this.purchaseOrderForm.get('detalleOrdenCompra') as FormArray).value;
        this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>(this.details);
    }

    createProduct(): FormGroup {
        return this.formBuilder.group({
            IDProducto: [null, []],
            IDUnidadMedida: [null, []],
            Cantidad: [null, []],
            TotalUnidadCompra: [null, []],
        });
    }

    //
    // ─── CALCULATE PURCHASE ORDER DETAIL ────────────────────────────────────────────
    //
    calculateDetailList(index) {
        const item: IPurchaseOrderDetail = Object.assign(
            {},
            ( (
                (this.purchaseOrderForm.controls.detalleOrdenCompra as FormArray).controls[index]
            ) as FormGroup).value
        );
        if (item && item.IDProducto) {
            this.productSelected = this.products.find(product => product.IDProducto === item.IDProducto);
        }
        if (item && item.Cantidad) {
            item.Cantidad = item.Cantidad * 1;
            ( (
                ( this.purchaseOrderForm.controls.detalleOrdenCompra as FormArray).controls[index]
            ) as FormGroup).controls.Cantidad.setValue(item.Cantidad);
            ( (
                ( this.purchaseOrderForm.controls.detalleOrdenCompra as FormArray).controls[index]
            ) as FormGroup).controls.TotalUnidadCompra.setValue(item.Cantidad * this.productSelected.PrecioCompra);
        }
        this.updateFooterSummary();
    }

    updateFooterSummary() {
        this.details = (this.purchaseOrderForm.get('detalleOrdenCompra') as FormArray).value;
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
        this.purchaseOrderForm.controls.Impuesto.setValue(sumTax)
        ;
        this.purchaseOrderForm.controls.Total.setValue(total);
    }

    clear() {
        this.purchaseOrderForm.controls.FechaEspectativa.setValue(null);
        this.purchaseOrderForm.controls.Idproveedor.setValue(null);
        this.purchaseOrderForm.controls.Tipo.setValue(null);
        this.purchaseOrderForm.controls.IdestadoOrdenCompra.setValue(null);
        this.purchaseOrderForm.controls.SubTotal.setValue(0);
        this.purchaseOrderForm.controls.Impuesto.setValue(0);
        this.purchaseOrderForm.controls.Total.setValue(0);
        (this.purchaseOrderForm.get('detalleOrdenCompra') as FormArray).clear();
        this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>([]);
    }

    inputExpectDate(expectDate: any) {
        this.purchaseOrderForm.get('FechaEspectativa').setValue(expectDate.value._d);
    }

    savePurchaseOrder() {
        this.loading = true;
        if (this.purchaseOrderForm.valid) {
            const newPurchaseOrder: IPurchaseOrder = this.purchaseOrderForm.value
            this.purchaseOrderService.createPurchaseOrder(newPurchaseOrder).subscribe(response => {
                this.izitoastAlertService.CustomSuccessAlert(response);
                this.loading = false;
                this.router.navigate(['/admin/orders/purchase-orders']);
            }, (err) => {
                this.izitoastAlertService.CustomErrorAlert('Hubo un error intentando crear la orden de compra');
                this.loading = false;
            });
        }
    }
}
