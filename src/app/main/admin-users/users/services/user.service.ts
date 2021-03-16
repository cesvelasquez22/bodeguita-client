import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'app/core/models/user.model';
import { headers } from 'app/shared/constants/responseType';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get<IUser[]>(
            `${environment.API_URL + environment.usuarioPrefix}/UsuarioList`
        );
    }

    getUser(Idusuario: string) {
        return this.http.get<IUser>(
            `${
                environment.API_URL + environment.usuarioPrefix
            }/Usuario/${Idusuario}`
        );
    }

    createUser(user: IUser) {
        return this.http.post(
            `${environment.API_URL + environment.usuarioPrefix}/AddUsuario`,
            user,
            { headers: headers, responseType: 'text' }
        );
    }

    updateUser(user: IUser) {
        return this.http.put(
            `${environment.API_URL + environment.usuarioPrefix}/UpdateUsuario/${
                user.Idusuario
            }`,
            user,
            { headers: headers, responseType: 'text' }
        );
    }
}
