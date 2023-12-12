import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteGraphsComponent } from './route-graphs.component';

describe('RouteGraphsComponent', () => {
  let component: RouteGraphsComponent;
  let fixture: ComponentFixture<RouteGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteGraphsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
