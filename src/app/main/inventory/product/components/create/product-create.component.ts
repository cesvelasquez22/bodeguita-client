import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'app/core/models/product.model';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBrand } from '../../models/brand.model';
import { ICategory } from '../../models/category.model';
import { IDimension } from '../../models/dimension.model';
import { ProductService } from '../../services/product/product.service';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit, OnDestroy {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;
    productId: string;

    //
    // ─── RELATED TO FORM ────────────────────────────────────────────────────────────
    //
    productForm: FormGroup;
    brands: IBrand[] = [];
    categories: ICategory[] = [];
    dimensions: IDimension[] = [];
    productInfo$: Observable<[
        IBrand[],
        ICategory[],
        IDimension[],
    ]>;

    //
    // ─── UNSUBSCIBE ALL ─────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<void> = new Subject();

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
            IDProducto: [0, [Validators.required]],
            Idmarca: [null, [Validators.required]],
            Idcategoria: [null, [Validators.required]],
            Iddimension: [null, [Validators.required]],
            Estado: [true, [Validators.required]],
            PrecioCompra: [null, []],
            PrecioVenta: [null, []],
        });
    }

    ngOnInit(): void {
        this.getSelectData();
        this.getProductInfo();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onSubmit(form) {
        this.loading = true;
        if (this.productId) {
            this.productService.updateProduct(this.productForm.value).subscribe(response => {
                this.izitoastAlertService.CustomSuccessAlert(response);
                this.loading = false;
                this.router.navigate(['/admin/inventory/products']);
            }, (err) => {
                this.izitoastAlertService.CustomErrorAlert('Hubo un error intentando actualizar el producto');
                this.loading = false;
            });
        } else {
            this.productService.createProduct(this.productForm.value).subscribe(response => {
                this.izitoastAlertService.CustomSuccessAlert(response);
                this.loading = false;
                this.router.navigate(['/admin/inventory/products']);
            }, (err) => {
                this.izitoastAlertService.CustomErrorAlert('Hubo un error intentando crear el producto');
                this.loading = false;
            });
        }
    }

    clear() {
        this.productForm.get('Idmarca').setValue(0);
        this.productForm.get('Idcategoria').setValue(0);
        this.productForm.get('Iddimension').setValue(0);
        this.productForm.get('PrecioCompra').setValue(0);
        this.productForm.get('PrecioVenta').setValue(0);
    }

    getSelectData() {
        this.loading = true;
        this.productInfo$ = combineLatest(
            this.mainFacadeService.getBrands(),
            this.mainFacadeService.getCategories(),
            this.mainFacadeService.getDimensions()
        );

        this.productInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
            if (data[0] && data[0].length > 0) {
                this.brands =  data[0];
            }

            if (data[1] && data[1].length > 0) {
                this.categories =  data[1];
            }

            if (data[2] && data[2].length > 0) {
                this.dimensions =  data[2];
            }

            this.loading = false;
        }, (err) => (this.loading = false));
    }

    getProductInfo() {
        this.clear();
        this.loading = true;
        if (this.productId) {
            //
            // ─── EDIT ────────────────────────────────────────────────────────
            //
            this.productService.getProduct(this.productId).subscribe(product => {
                if (product && product !== null) {
                    this.setToProductForm(product);
                }
                this.loading = false;
            }, (err) => (this.loading = false));
        }
    }

    setToProductForm(product: any) {
        this.productForm.controls.IDProducto.setValue(product.Idproducto);
        this.productForm.controls.Idmarca.setValue(product.Idmarca);
        this.productForm.controls.Idcategoria.setValue(product.Idcategoria);
        this.productForm.controls.Iddimension.setValue(product.Iddimension);
        this.productForm.controls.Estado.setValue(product.Estado);
        this.productForm.controls.PrecioCompra.setValue(product.PrecioCompra);
        this.productForm.controls.PrecioVenta.setValue(product.PrecioVenta);
    }
}
