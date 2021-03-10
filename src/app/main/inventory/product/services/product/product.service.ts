import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IProduct } from '../../../../../core/models/product.model';
import { headers } from 'app/shared/constants/responseType';

@Injectable()
export class ProductService {

  constructor(
      private http: HttpClient,
  ) { }
  //
  // ────────────────────────────────────────────── I ──────────
  //   :::::: G E T : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────
  //
  getProduct(productId: string) {
    return this.http.get<IProduct>(`${ environment.API_URL + environment.productoPrefix }/Producto/${productId}`);
  }
  
  //
  // ──────────────────────────────────────────────── II ──────────
  //   :::::: P O S T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  //
  createProduct(product: IProduct) {
    return this.http.post(`${environment.API_URL + environment.productoPrefix}/AddProducto`, product, { headers: headers, responseType: 'text'});
  }

  //
  // ──────────────────────────────────────────────────── III ──────────
  //   :::::: U P D A T E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  //
  updateProduct(product: IProduct) {
    return this.http.put(`${environment.API_URL + environment.productoPrefix}/UpdateProducto/${product.IDProducto}`, product, { headers: headers, responseType: 'text'});
  }
  
}
