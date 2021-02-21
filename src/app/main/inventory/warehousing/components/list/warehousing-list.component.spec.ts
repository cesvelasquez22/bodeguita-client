import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousingListComponent } from './warehousing-list.component';

describe('WarehousingListComponent', () => {
  let component: WarehousingListComponent;
  let fixture: ComponentFixture<WarehousingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
