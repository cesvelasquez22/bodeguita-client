import { Injectable } from '@angular/core';
import { IRole } from 'app/core/models/role.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateRoleService {
  private newRole = new BehaviorSubject<IRole>(null);
  public newRole$ = this.newRole.asObservable();

  constructor() { }

  addRole(role: IRole) {
    this.newRole.next(role);
  }
}
