import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../models/product.model';

@Injectable()
export class ProductListService {

    private productos = new BehaviorSubject<IProduct[]>([]);
    public productos$ = this.productos.asObservable();

    constructor() { }

    setListaProductos(listado: IProduct[]) {
        this.productos.next(listado);
    }
}
