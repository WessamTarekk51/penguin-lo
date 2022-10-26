import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalScreenComponent } from './digital-screen.component';

describe('DigitalScreenComponent', () => {
  let component: DigitalScreenComponent;
  let fixture: ComponentFixture<DigitalScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
