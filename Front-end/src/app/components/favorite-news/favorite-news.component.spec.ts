import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteNewsComponent } from './favorite-news.component';

describe('FavoriteNewsComponent', () => {
  let component: FavoriteNewsComponent;
  let fixture: ComponentFixture<FavoriteNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
