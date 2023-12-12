import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallViewComponent } from './wall-view.component';

describe('WallViewComponent', () => {
  let component: WallViewComponent;
  let fixture: ComponentFixture<WallViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
