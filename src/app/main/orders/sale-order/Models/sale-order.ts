export class ISaleOrder {

    idOrdenVenta: number;
    fechaCreacion: Date;
    fechaSalida: Date;
    idCliente: number;
    tipo: number;
    estado: ISaleOrderState;

}

export class ISaleOrderState {
    IdEstadoOrdenVenta: number;
    Nombre: string;
}
