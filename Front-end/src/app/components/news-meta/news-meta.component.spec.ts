import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMetaComponent } from './news-meta.component';

describe('NewsMetaComponent', () => {
  let component: NewsMetaComponent;
  let fixture: ComponentFixture<NewsMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
