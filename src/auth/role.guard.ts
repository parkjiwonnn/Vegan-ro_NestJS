import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtToken(request);

    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const { role } = decoded; // 토큰에서 역할 정보 추출

      // 여기서 역할에 따라 처리
      if (role === 'admin') {
        // 어드민 권한 확인
        return true;
      } else if (role === 'user') {
        // 일반 사용자 권한 확인
        return true;
      } else {
        throw new UnauthorizedException('올바르지 않은 역할입니다.');
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('토큰 인증에 실패했습니다.');
    }
  }

  private extractJwtToken(request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && (authHeader.startsWith('Bearer ') || authHeader.startsWith('Basic '))) {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}
