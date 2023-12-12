import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWallComponent } from './edit-wall.component';

describe('EditWallComponent', () => {
  let component: EditWallComponent;
  let fixture: ComponentFixture<EditWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
