import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {IDrole} from '../models/idrole';

@Injectable()
export class RoleService {

  constructor(
    private http: HttpClient,
  ) { }

getRoles() {
  return this.http.get<IDrole[]>(`${environment.API_URL + environment.rolesPrefix}/RoleList`);
}

}