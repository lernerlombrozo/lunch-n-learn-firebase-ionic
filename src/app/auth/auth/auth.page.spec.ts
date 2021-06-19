import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/tests/testing.module';
import { AuthPage } from './auth.page';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
