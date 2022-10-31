import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPageComponent2 } from './diet-page2.component';

describe('DietPageComponent2', () => {
  let component: DietPageComponent2;
  let fixture: ComponentFixture<DietPageComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPageComponent2 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietPageComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
