import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Inventory } from "../models/inventory";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  apiURL = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  getInventoryList(){
    return this.http.get<Inventory[]>(this.apiURL + "inventario/inventariolist");
  }
}
