import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWallComponent } from './add-wall.component';

describe('AddWallComponent', () => {
  let component: AddWallComponent;
  let fixture: ComponentFixture<AddWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
