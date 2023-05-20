import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // We always get an array of roles
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user = request?.user;

    if (!requiredRoles || requiredRoles.includes('Any')) return true;

    if (!user?.roles || user.roles.length === 0) return false;

    const matchRoles = requiredRoles?.some((role) =>
      user.roles?.includes(role),
    );

    if (!matchRoles) {
      throw new UnauthorizedException([
        'You do not have permission for this action',
      ]);
    }
    return matchRoles;
  }
}
