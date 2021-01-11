import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneTokenComponent } from './change-phone-token.component';

describe('ChangePhoneTokenComponent', () => {
  let component: ChangePhoneTokenComponent;
  let fixture: ComponentFixture<ChangePhoneTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePhoneTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhoneTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
