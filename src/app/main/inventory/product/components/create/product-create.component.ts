import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { IBrand } from '../../models/brand.model';
import { ICategory } from '../../models/category.model';
import { IDimension } from '../../models/dimension.model';
import { ProductService } from '../../services/product/product.service';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;
    productId: string;

    //
    // ─── RELATED TO FORM ────────────────────────────────────────────────────────────
    //
    productForm: FormGroup;
    productInfo$: Observable<[
        IBrand[],
        ICategory[],
        IDimension[],
    ]>;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {
        this.buildForm();
        this.productId = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.productForm = this.formBuilder.group({
            IDMarca: [null, [Validators.required]],
            IDCategoria: [null, [Validators.required]],
            PrecioUnitario: [null, [Validators.required]],
            IDDimension: [null, [Validators.required]],
            Estado: [true, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getProductInfo();
    }

    onSubmit(form) {
        console.log(this.productForm.value);
    }

    clear() {
        this.productForm.get('IDMarca').setValue(0);
        this.productForm.get('IDCategoria').setValue(0);
        this.productForm.get('PrecioUnitario').setValue(0);
        this.productForm.get('IDDimension').setValue(0);
    }

    getProductInfo() {
        this.clear();
        this.loading = true;
        if (this.productId) {
            //
            // ─── EDIT ────────────────────────────────────────────────────────
            //
            this.loading = false;
        } else {
            //
            // ─── CREATE ──────────────────────────────────────────────────────
            //
            this.productInfo$ = combineLatest(
                this.productService.getBrands(),
                this.productService.getCategories(),
                this.productService.getDimensions()
            );
            this.loading = false;
        }
    }
}
