import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nav } from './nav';
import { SignInService } from '../../../services/sign-in';

describe('Nav', () => {
  let component: Nav;
  let fixture: ComponentFixture<Nav>;
  let signinServiceSpy: jasmine.SpyObj<SignInService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SignInService', ['loginUser', 'logout']);

    await TestBed.configureTestingModule({
      imports: [Nav],
      providers: [{ provide: SignInService, useValue: spy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    signinServiceSpy = TestBed.inject(SignInService) as jasmine.SpyObj<SignInService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería inyectar correctamente el servicio SignInService', () => {
    expect(component.signinService).toBeTruthy();
    expect(component.signinService).toBe(signinServiceSpy);
  });
});
    