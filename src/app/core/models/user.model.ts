export class IUser {
    Idusuario: number;
    Nombre: string;
    Correo:string;
    Contrasenia: string;
    UserName: string;
    Idrole: number;
    Estado: boolean;
}

export class IUserLogin {
    UserName:string;
    Contrasenia: string;
}