import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousingCreateComponent } from './warehousing-create.component';

describe('WarehousingCreateComponent', () => {
  let component: WarehousingCreateComponent;
  let fixture: ComponentFixture<WarehousingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousingCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
