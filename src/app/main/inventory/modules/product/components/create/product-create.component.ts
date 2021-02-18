import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  loading: boolean;

  form: FormGroup;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
  }

}
