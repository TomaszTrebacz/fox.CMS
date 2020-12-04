import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByEmailComponent } from './by-email.component';

describe('ByEmailComponent', () => {
  let component: ByEmailComponent;
  let fixture: ComponentFixture<ByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
