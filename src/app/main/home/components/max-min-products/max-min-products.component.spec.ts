import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinProductsComponent } from './max-min-products.component';

describe('MaxMinProductsComponent', () => {
  let component: MaxMinProductsComponent;
  let fixture: ComponentFixture<MaxMinProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxMinProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxMinProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
