export class IPurchaseOrder {
    idOrdenCompra: number;
    fechaCreacion: Date;
    fechaEspectativa: Date;
    idProveedor: number;
    tipo: string;
    detalleOrdenCompra: IPurchaseOrderDetail[];
    userCreatedId: number;
    estado: IPurchaseOrderState;
}

export class IPurchaseOrderDetail {
    IDOrdenCompra: number;
    IDProducto: number;
    IDUnidadMedida: number;
    Cantidad: number;
}

export class IPurchaseOrderState {
    IdEstadoOrdenCompra: number;
    Nombre: string;
}
