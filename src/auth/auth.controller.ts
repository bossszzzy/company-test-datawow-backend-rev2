import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserIdRequiredException } from 'src/common/exceptions/user-id-required.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) { }

  @Get('me')
  async me(@Headers('x-user-id') userId?: string) {
    if (!userId) {
      throw new UserIdRequiredException;
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UserNotFoundException;
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role.toLowerCase() as 'admin' | 'user',
    };
  }

  @Get('switch/:target')
  async switch(@Param('target') target: 'admin' | 'user') {
    const role = target.toUpperCase() as 'ADMIN' | 'USER';
    const u = await this.prisma.user.findFirst({
      where: { role },
      select: { id: true, username: true, role: true },
    });
    if (!u) {
      return { ok: false, message: `No ${role} user found` };
    }
    return { ok: true, userId: u.id, role: target };
  }
}