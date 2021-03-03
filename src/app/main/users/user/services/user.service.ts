import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {User} from '../models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }


  //
  // ────────────────────────────────────────────── I ──────────
  //   :::::: G E T : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────
  // :( no tengo la extension para esto

  
  getUsers() {
    return this.http.get<User[]>(`${environment.API_URL + environment.userPrefix}/usuarioslist`);
  }

}


