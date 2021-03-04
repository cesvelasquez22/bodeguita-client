export class ISaleOrder {
    idOrdenVenta: number;
    fechaCreacion: Date;
    fechaSalida: Date;
    idCliente: number;
    tipo: number;
    estado: ISaleOrderState;
    total: number;
    detalleOrdenVenta: ISaleOrderDetail;
}

export class ISaleOrderDetail {
    IDOrdenVenta: number;
    IDProducto: number;
    IDUnidadMedida: number;
    Cantidad: number;
    TotalUnidadVenta: number;
}

export class ISaleOrderState {
    IdEstadoOrdenVenta: number;
    Nombre: string;
}
