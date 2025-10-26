import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from 'generated/prisma/enums';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const role = req.headers['x-role']
    if (role !== 'ADMIN' && role !== 'admin') throw new ForbiddenException('Admin Only')
    return true;
  }

}

export function getUserId(req: any): string {
  const id = req.headers['x-user-id'];
  if (!id || typeof id !== 'string') throw new ForbiddenException('x-user-id required');
  return id
}