import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {Providemodel} from '../models/providemodel';


@Injectable({
  providedIn: 'root'
})
export class ProviderservicesService {

  constructor(
    private http: HttpClient,
  ) { }
/********************/
  //Get
/********************/
 
getProviders() {
    return this.http.get<Providemodel[]>(`${environment.API_URL + environment.proveedorPrefix}/ProveedorList`);
  }

}
