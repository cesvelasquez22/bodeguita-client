export class IUser {
    IDUsuario: number;
    Nombre: string;
    Correo:string;
    Contrasenia: string;
    UserName: string;
    IDRole: number;
    Estado: boolean;
}

export class IUserLogin {
    UserName:string;
    Contrasenia: string;
}