import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IProduct } from '../../../../../core/models/product.model';
import { IBrand } from '../../models/brand.model';
import { ICategory } from '../../models/category.model';
import { IDimension } from '../../models/dimension.model';

@Injectable()
export class ProductService {

  constructor(
      private http: HttpClient,
  ) { }
  //
  // ──────────────────────────────────────────────── II ──────────
  //   :::::: P O S T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  //
  createProduct(product: IProduct) {
    return this.http.post<IProduct>(`${environment.API_URL + environment.productoPrefix}/AddProducto`, product);
  }

  //
  // ──────────────────────────────────────────────────── III ──────────
  //   :::::: U P D A T E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  //
  
}
