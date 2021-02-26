import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProvider } from 'app/core/models/provider.model';
import { EPaymentMethod } from 'app/core/models/paymentMethod.enum';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';
import { IPurchaseOrderDetail } from '../../models/purchase-order.model';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'app/core/models/product.model';
import { IMeasureUnit } from 'app/core/models/measureUnit.model';

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
    purchaseOrderInfo$: Observable<[IProvider[], IProduct[], IMeasureUnit[]]>;
    purchaseOrderProvider: IProvider;
    paymentMethod = EPaymentMethod;

    //
    // ─── RELATED TO DETAILS TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = [
        'Posicion',
        'IDProducto',
        'IDUnidadMedida',
        'Cantidad',
        'PrecioUnitario',
        'Subtotal',
        'Actions',
    ];
    dataSource = new MatTableDataSource<IPurchaseOrderDetail>([]);
    details: IPurchaseOrderDetail[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private purchaseOrderService: PurchaseOrderService,
    ) {
        this.buildForm();
        this.purchaseOrderId = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.purchaseOrderForm = this.formBuilder.group({
            FechaEspectativa: [null, [Validators.required]],
            Idproveedor: [null, [Validators.required]], 
            Tipo: [null, [Validators.required]],
            IdestadoOrdenCompra: [true, [Validators.required]],
            detalleOrdenCompra: new FormArray([]),
        });
    }

    ngOnInit(): void {
        this.getPurchaseOrderInfo();
        console.log(this.paymentMethod);
    }

    purchaseOrderSetData() {
        this.purchaseOrderInfo$.pipe(
            map((data => {
                this.purchaseOrderProvider = data[0].find(provider => provider.IdProveedor = this.Idproveedor);
            }))
        );
    }

    get Idproveedor(): number {
        return this.purchaseOrderForm.controls.Idproveedor.value;
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
            this.purchaseOrderInfo$ = combineLatest(
                this.purchaseOrderService.getProviders(),
                this.purchaseOrderService.getProducts(),
                this.purchaseOrderService.getMeasureUnits(),

            );

            this.purchaseOrderInfo$.subscribe(data => console.log(data));
            this.loading = false;
        }

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
            this.createProduct(null)
        );
        this.details = (this.purchaseOrderForm.get('detalleOrdenCompra') as FormArray).value;
        this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>(this.details);
    }

    createProduct(product?: IPurchaseOrderDetail): FormGroup {
        if (product) {
            return this.formBuilder.group({
                IDOrdenCompra: [product.IDOrdenCompra, []],
                IDProducto: [product.IDProducto, []],
                IDUnidadMedida: [product.IDUnidadMedida, []],
                Cantidad: [product.Cantidad, []],
            });
        }

        return this.formBuilder.group({
            IDOrdenCompra: [0, []],
            IDProducto: [null, []],
            IDUnidadMedida: [null, []],
            Cantidad: [null, []],
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
        console.log(item);
        // if (item && item.quantity && item.unitPrice) {
        //     item.Cantidad = item.Cantidad * 1;
        //     item.unitPrice = item.unitPrice * 1;
        //     ( (
        //         ( this.purchaseOrderForm.controls.detalleOrdenCompra as FormArray).controls[index]
        //     ) as FormGroup).controls.name.setValue(item.name);
        //     ( (
        //         ( this.purchaseOrderForm.controls.detalleOrdenCompra as FormArray).controls[index]
        //     ) as FormGroup).controls.quantity.setValue(item.quantity);
        //     ( (
        //         ( this.purchaseOrderForm.controls.detalleOrdenCompra as FormArray).controls[index]
        //     ) as FormGroup).controls.unitPrice.setValue(item.unitPrice);
        //     ( (
        //         ( this.purchaseOrderForm.controls.detalleOrdenCompra as FormArray).controls[index]
        //     ) as FormGroup).controls.tax.setValue(item.tax);
        //     ( (
        //         ( this.purchaseOrderForm.controls.detalleOrdenCompra as FormArray).controls[index]
        //     ) as FormGroup).controls.subtotal.setValue(item.quantity * item.unitPrice);
        // }
        // this.updateFooterSummary();
        // this.calculateChange();
    }

    clear() {
        this.purchaseOrderForm.controls.FechaEspectativa.setValue(null);
        this.purchaseOrderForm.controls.Idproveedor.setValue(null);
        this.purchaseOrderForm.controls.Tipo.setValue(null);
        this.purchaseOrderForm.controls.IdestadoOrdenCompra.setValue(null);
        (this.purchaseOrderForm.get('detalleOrdenCompra') as FormArray).clear();
        this.dataSource = new MatTableDataSource<IPurchaseOrderDetail>([]);
    }

    savePurchaseOrder() {}
}
