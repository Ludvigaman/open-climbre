import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallManagerComponent } from './wall-manager.component';

describe('WallManagerComponent', () => {
  let component: WallManagerComponent;
  let fixture: ComponentFixture<WallManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WallManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
