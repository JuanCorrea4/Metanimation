import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePortfoliosComponent } from './favorite-portfolios.component';

describe('FavoritePortfoliosComponent', () => {
  let component: FavoritePortfoliosComponent;
  let fixture: ComponentFixture<FavoritePortfoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePortfoliosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePortfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
