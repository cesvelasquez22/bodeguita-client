import { IProduct } from "../../product/models/product.model";

export class Inventory{
    idInventario: number;
    idProducto: number;
    cantidad: number;
    producto: IProduct;
}