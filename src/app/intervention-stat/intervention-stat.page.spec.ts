import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterventionStatPage } from './intervention-stat.page';

describe('InterventionStatPage', () => {
  let component: InterventionStatPage;
  let fixture: ComponentFixture<InterventionStatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionStatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
