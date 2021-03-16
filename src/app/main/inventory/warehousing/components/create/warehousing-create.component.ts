import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'app/core/models/product.model';
import { IWarehousing } from 'app/core/models/warehousing.model';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WarehousingService } from '../../services/warehousing.service';

@Component({
    selector: 'app-warehousing-create',
    templateUrl: './warehousing-create.component.html',
    styleUrls: ['./warehousing-create.component.scss'],
})
export class WarehousingCreateComponent implements OnInit, OnDestroy {
    title: string;

    //
    // ─── RELATED TO FORM ────────────────────────────────────────────────────────────
    //
    form: FormGroup;
    products: IProduct[];

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<any> = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private warehousingService: WarehousingService,
        private mainFacadeService: MainFacadeService,
        public dialogRef: MatDialogRef<WarehousingCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.form = this.formBuilder.group({
            IdInventario: [0, [Validators.required]],
            Idproducto: [0, [Validators.required]],
            Cantidad: [0, [Validators.required]],
            Estado: [true, [Validators.required]],
            edit: [this.data && this.data.editProductInventory ? true : false],
        });
    }

    ngOnInit(): void {
        this.getProductInventoryInfo();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getProductInventoryInfo() {
        //
        // ─── CREATE ──────────────────────────────────────────────────────
        //
        this.title = 'Nuevo';
        this.mainFacadeService.getProducts().subscribe((products) => {
            if (products && products.length > 0) {
                this.products = products;
            }
        });
        if (this.form.controls.edit.value === true) {
            //
            // ─── EDIT ────────────────────────────────────────────────────────
            //
            this.title = 'Editar';
            const productInventory: IWarehousing = this.data.editProductInventory;
            this.warehousingService.getProductInventory(productInventory.IdInventario).subscribe(product => {
                if (product && product !== null) {
                    this.setWarehousingInfo(product);
                }
            });

        }
    }

    onSubmit(form) {
        if (this.data && this.data.editProductInventory) {
            this.onCancel();
        }
        this.warehousingService.addProductInventory(this.form.value);
        this.dialogRef.close(this.form.value);
        this.warehousingService.addProductInventory(null);
        this.clear();
    }

    onCancel() {
        this.dialogRef.close();
    }

    setWarehousingInfo(productInventory: any) {
        this.form.controls.IdInventario.setValue(productInventory.Idinventario);
        this.form.controls.Idproducto.setValue(productInventory.Idproducto);
        this.form.controls.Cantidad.setValue(productInventory.Cantidad);
        this.form.controls.Estado.setValue(productInventory.Estado);
    }

    clear() {
        this.form.reset();
        this.form.controls.Idproducto.setValue(0);
        this.form.controls.Cantidad.setValue(0);
    }
}
