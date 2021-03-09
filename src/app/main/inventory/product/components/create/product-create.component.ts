import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'app/core/models/product.model';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';
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
        private productService: ProductService,
        private mainFacadeService: MainFacadeService,
        private izitoastAlertService: IzitoastAlertService,
    ) {
        this.buildForm();
        this.productId = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.productForm = this.formBuilder.group({
            IDMarca: [null, [Validators.required]],
            IDCategoria: [null, [Validators.required]],
            PrecioCompra: [null, []],
            PrecioVenta: [null, []],
            IDDimension: [null, [Validators.required]],
            Estado: [true, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getProductInfo();
    }

    onSubmit(form) {
        this.loading = true;
        if (this.productForm.valid) {
            const newProduct: IProduct = this.productForm.value;
            this.productService.createProduct(newProduct).subscribe(data => {
                console.log(data);
                this.izitoastAlertService.CustomSuccessAlert('Se ha creado el producto con éxito');
                this.loading = false;
                this.router.navigate(['/products']);
            }, (err) => {
                console.log(err);
                this.izitoastAlertService.CustomErrorAlert('Hubo un error intentando crear el producto');
                this.loading = false;
            });
        }
    }

    clear() {
        this.productForm.get('IDMarca').setValue(0);
        this.productForm.get('IDCategoria').setValue(0);
        this.productForm.get('PrecioCompra').setValue(0);
        this.productForm.get('PrecioVenta').setValue(0);
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
                this.mainFacadeService.getBrands(),
                this.mainFacadeService.getCategories(),
                this.mainFacadeService.getDimensions()
            );
            this.loading = false;
        }
    }
}
