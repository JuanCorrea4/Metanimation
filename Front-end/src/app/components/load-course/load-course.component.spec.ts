import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCourseComponent } from './load-course.component';

describe('LoadCourseComponent', () => {
  let component: LoadCourseComponent;
  let fixture: ComponentFixture<LoadCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadCourseComponent]
    });
    fixture = TestBed.createComponent(LoadCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
