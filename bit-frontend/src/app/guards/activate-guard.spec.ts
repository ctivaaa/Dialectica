import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';

import { activateGuard } from './activate-guard';
import { SignInService } from '../services/sign-in';

describe('activateGuard', () => {
  let signInServiceSpy: jasmine.SpyObj<SignInService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let location: Location;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => activateGuard(...guardParameters));

  beforeEach(() => {
    signInServiceSpy = jasmine.createSpyObj('SignInService', ['adminValid']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SignInService, useValue: signInServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    location = TestBed.inject(Location);
  });

  it('should allow activation if adminValid() returns true', () => {
    signInServiceSpy.adminValid.and.returnValue(true);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTrue();
    expect(signInServiceSpy.adminValid).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should block activation and redirect if adminValid() returns false', () => {
    signInServiceSpy.adminValid.and.returnValue(false);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(signInServiceSpy.adminValid).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
