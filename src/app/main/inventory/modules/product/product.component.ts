import { Component, OnInit } from '@angular/core';
import { ProductListService } from './services/product-list/product-list.service';
import { ProductService } from './services/product/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;

    constructor(
        private productService: ProductService,
        private productListService: ProductListService
    ) {}

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.loading = true;
        this.productService.getProducts().subscribe(
            (productos) => {
                if (productos && productos.length > 0) {
                    this.productListService.setListaProductos(productos);
                }
                this.loading = false;
            },
            (err) => (this.loading = false)
        );
    }
}
