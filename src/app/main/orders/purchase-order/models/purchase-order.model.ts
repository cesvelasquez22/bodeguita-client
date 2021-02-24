export class IPurchaseOrder {
    idOrdenCompra: number;
    fechaCreacion: Date;
    fechaEspectativa: Date;
    idProveedor: number;
    tipo: string;
    userCreatedId: number;
    estado: IPurchaseOrderState;
}

export class IPurchaseOrderState {
    IdEstadoOrdenCompra: number;
    Nombre: string;
}
