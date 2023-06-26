import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBriefcaseComponent } from './details-briefcase.component';

describe('DetailsBriefcaseComponent', () => {
  let component: DetailsBriefcaseComponent;
  let fixture: ComponentFixture<DetailsBriefcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBriefcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBriefcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
