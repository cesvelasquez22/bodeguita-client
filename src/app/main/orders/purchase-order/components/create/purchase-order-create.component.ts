import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    //
    // ─── RELATED TO FORM ────────────────────────────────────────────────────────────
    //
    purchaseOrderForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        this.buildForm();
    }

    private buildForm() {
        this.purchaseOrderForm = this.formBuilder.group({
            FechaEspectativa: [null, [Validators.required]],
            IDProveedor: [null, [Validators.required]], 
            Tipo: [null, [Validators.required]],
            IDEstadoOrdenCompra: [1, [Validators.required]],
        });
    }

    ngOnInit(): void {
        console.log(this.purchaseOrderForm.value);
    }
}
