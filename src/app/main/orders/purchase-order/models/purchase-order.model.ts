export class IPurchaseOrder {
    IdordenCompra: number;
    FechaCreacion: Date;
    FechaEspectativa: Date;
    Idproveedor: number;
    Tipo: string;
    DetalleOrdenCompra: IPurchaseOrderDetail[];
    UserCreatedId: number;
    Impuesto: number;
    SubTotal: number;
    Total: number;
    IdestadoOrdenCompra: number;
}

export class IPurchaseOrderDetail {
    IdordenCompra: number;
    Idproducto: number;
    IdunidadMedida: number;
    Cantidad: number;
    PrecioCompra: number;
    TotalUnidadCompra: number;
}

