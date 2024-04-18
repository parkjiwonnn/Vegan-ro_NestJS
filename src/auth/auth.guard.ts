import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtToken(request);

    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.'); // 토큰이 없는 경우 예외 발생
    }

    try {
      const decoded = this.jwtService.verify(token); // 토큰 검증
      request.user = decoded; // 요청에 사용자 정보 추가
      return true; // 인증 성공
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('토큰 인증에 실패했습니다.'); // 토큰이 유효하지 않은 경우 예외 발생
    }
  }

  private extractJwtToken(request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}
