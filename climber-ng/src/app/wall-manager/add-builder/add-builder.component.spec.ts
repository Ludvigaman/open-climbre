import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuilderComponent } from './add-builder.component';

describe('AddBuilderComponent', () => {
  let component: AddBuilderComponent;
  let fixture: ComponentFixture<AddBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
