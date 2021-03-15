export class ISaleOrder {
    IdordenVenta: number;
    FechaCreacion: Date;
    FechaSalida: Date;
    Idcliente: number;
    Tipo: number;
    IdestadoOrdenVenta: number;
    SubTotal: number;
    IdDescuento: number;
    MontoDescuento: number;
    Impuesto: number;
    Total: number;
    DetalleOrdenVenta: ISaleOrderDetail[];
}

export class ISaleOrderDetail {
    IdordenVenta: number;
    Idproducto: number;
    IdunidadMedida: number;
    Cantidad: number;
    PrecioVenta: number;
    TotalUnidadVenta: number;
}

