import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product.model';

@Injectable()
export class ProductService {
    API_URL = environment.API_URL;
    productoPrefix = environment.productoPrefix;

  constructor(
      private http: HttpClient,
  ) { }

  //
  // ────────────────────────────────────────────── I ──────────
  //   :::::: G E T : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────
  //
  getProducts() {
      return this.http.get<IProduct[]>(`${this.API_URL + this.productoPrefix}/ProductoList`);
  }

  //
  // ──────────────────────────────────────────────── II ──────────
  //   :::::: P O S T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  //


  //
  // ──────────────────────────────────────────────────── III ──────────
  //   :::::: U P D A T E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  //
  
}
