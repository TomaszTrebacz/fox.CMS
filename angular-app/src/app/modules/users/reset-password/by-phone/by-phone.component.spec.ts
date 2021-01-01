import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByPhoneComponent } from './by-phone.component';

describe('ByPhoneComponent', () => {
  let component: ByPhoneComponent;
  let fixture: ComponentFixture<ByPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
