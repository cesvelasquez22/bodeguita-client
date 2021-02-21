import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IProduct } from '../../models/product.model';
import { IBrand } from '../../models/brand.model';
import { ICategory } from '../../models/category.model';
import { IDimension } from '../../models/dimension.model';

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
  getProducts() {
      return this.http.get<IProduct[]>(`${environment.API_URL + environment.productoPrefix}/ProductoList`);
  }

  getBrands() {
      return this.http.get<IBrand[]>(`${environment.API_URL + environment.marcaPrefix}/MarcaList`);
  }

  getCategories() {
      return this.http.get<ICategory[]>(`${environment.API_URL + environment.categoriaPrefix}/CategoriaList`);
  }

  getDimensions() {
    return this.http.get<IDimension[]>(`${environment.API_URL + environment.dimensionPrefix}/DimensionList`);
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
