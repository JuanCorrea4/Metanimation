import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefcaseProjectComponent } from './briefcase-project.component';

describe('BriefcaseProjectComponent', () => {
  let component: BriefcaseProjectComponent;
  let fixture: ComponentFixture<BriefcaseProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriefcaseProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefcaseProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
