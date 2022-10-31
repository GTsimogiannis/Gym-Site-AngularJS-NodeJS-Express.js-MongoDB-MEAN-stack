import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPageComponent3 } from './diet-page3.component';

describe('DietPageComponent3', () => {
  let component: DietPageComponent3;
  let fixture: ComponentFixture<DietPageComponent3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPageComponent3 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietPageComponent3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
