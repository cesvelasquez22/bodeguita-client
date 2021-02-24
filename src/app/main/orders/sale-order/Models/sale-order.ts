export class IDSaleOrder {

    IdordenVenta: number;
    FechaCreacion: Date;
    FechaSalida: Date;
    UserCreatedId: Date;
    Idcliente: number;
    estadoOrdenVenta: IdSaleOrderState;

}

export class IdSaleOrderState {
    IdEstadoOrdenVenta: number;
    Nombre: string;
}
