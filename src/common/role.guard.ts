import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserIdRequiredException } from './exceptions/user-id-required.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { AdminOnlyException } from './exceptions/admin-only.exception';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private prisma: PrismaService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const userId = (req.headers as any)['x-user-id'] as string | undefined;

    if (!userId) throw new UserIdRequiredException;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!user) throw new UserNotFoundException
    if (user.role !== 'ADMIN') throw new AdminOnlyException;

    return true;
  }

}

export function getUserId(req: any): string {
  const id = req.headers['x-user-id'];
  if (!id || typeof id !== 'string') throw new UserIdRequiredException;
  return id
}