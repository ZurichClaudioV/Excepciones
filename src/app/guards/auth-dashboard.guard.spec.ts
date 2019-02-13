import { TestBed, async, inject } from '@angular/core/testing';

import { AuthDashboardGuard } from './auth-dashboard.guard';

describe('AuthDashboardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDashboardGuard]
    });
  });

  it('should ...', inject([AuthDashboardGuard], (guard: AuthDashboardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
