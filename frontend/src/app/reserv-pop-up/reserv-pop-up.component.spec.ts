import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservPopUpComponent } from './reserv-pop-up.component';

describe('ReservPopUpComponent', () => {
  let component: ReservPopUpComponent;
  let fixture: ComponentFixture<ReservPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
