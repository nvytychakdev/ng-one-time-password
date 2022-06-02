import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOneTimePasswordComponent } from './ng-one-time-password.component';

describe('NgOneTimePasswordComponent', () => {
  let component: NgOneTimePasswordComponent;
  let fixture: ComponentFixture<NgOneTimePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgOneTimePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgOneTimePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
