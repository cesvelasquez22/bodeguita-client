import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProvider } from 'app/core/models/provider.model';
import { EPaymentMethod } from 'app/core/models/paymentMethod.enum';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';

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
    purchaseOrderInfo$: Observable<[IProvider[]]>;
    purchaseOrderProvider: IProvider;
    paymentMethod = EPaymentMethod;

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
            FechaCreacion: [Date.now(), [Validators.required]]
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
            );
            this.loading = false;
        }

    }
}
