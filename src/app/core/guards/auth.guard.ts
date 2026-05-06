import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

export const roleGuard = (requiredRoles: string[]): CanActivateFn => {
  return (route, state) => {
    return true;
  };
};
