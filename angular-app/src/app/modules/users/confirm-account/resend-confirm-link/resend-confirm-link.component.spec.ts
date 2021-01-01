import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendConfirmLinkComponent } from './resend-confirm-link.component';

describe('ResendConfirmLinkComponent', () => {
  let component: ResendConfirmLinkComponent;
  let fixture: ComponentFixture<ResendConfirmLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendConfirmLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendConfirmLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
