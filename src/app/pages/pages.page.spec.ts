import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '../tests/testing.module';
import { PagesPage } from './pages.page';

describe('PagesPage', () => {
  let component: PagesPage;
  let fixture: ComponentFixture<PagesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesPage],
      imports: [TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
