import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole } from 'app/core/models/role.model';
import { headers } from 'app/shared/constants/responseType';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private http: HttpClient) {}

    getRole(IdRole: string) {
        return this.http.get<IRole>(
            `${
                environment.API_URL + environment.rolesPrefix
            }/Role/${IdRole}`
        );
    }

    createRole(role: IRole) {
        return this.http.post(
            `${environment.API_URL + environment.rolesPrefix}/AddRole`,
            role,
            { headers: headers, responseType: 'text' }
        );
    }

    updateRole(role: IRole) {
        return this.http.put(
            `${environment.API_URL + environment.rolesPrefix}/UpdateRole/${
                role.IdRole
            }`,
            role,
            { headers: headers, responseType: 'text' }
        );
    }
}
