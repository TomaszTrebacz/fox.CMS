import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCategoryComponent } from './change-category.component';

describe('ChangeCategoryComponent', () => {
  let component: ChangeCategoryComponent;
  let fixture: ComponentFixture<ChangeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
