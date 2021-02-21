import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchTextService {

  private valueToFind = new BehaviorSubject<string>('');
  public valueToFind$ = this.valueToFind.asObservable();

  //
  // ─── FILTER SELECT TO TABLES ────────────────────────────────────────────────────
  //
  private filterBy = new BehaviorSubject<boolean>(true);
  public filterBy$ = this.filterBy.asObservable();


  constructor() { }

  public setValueToFind(text: string) {
    this.valueToFind.next(text);
  }

  setFilterBy(filter: boolean) {
    this.filterBy.next(filter);
  }
}
