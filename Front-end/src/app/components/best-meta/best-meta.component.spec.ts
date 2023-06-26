import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestMetaComponent } from './best-meta.component';

describe('BestMetaComponent', () => {
  let component: BestMetaComponent;
  let fixture: ComponentFixture<BestMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
