import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneComponent } from './change-phone.component';

describe('ChangePhoneComponent', () => {
  let component: ChangePhoneComponent;
  let fixture: ComponentFixture<ChangePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
