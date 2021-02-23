import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicCompComponent } from './tic-comp.component';

describe('TicCompComponent', () => {
  let component: TicCompComponent;
  let fixture: ComponentFixture<TicCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
