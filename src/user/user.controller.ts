// user.controller.ts
import { Controller, Post, Body, Get, Patch, Param, UseGuards, Req, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ResponseFormat } from 'src/errors/response.format';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
// 카카오 로그인
  @Post('auth/kakao/login')
  async handleKakaoLogin(@Body('code') code: string) {
   const token = await this.userService.handleKakaoLogin(code);
   return ResponseFormat.buildResponse({ token: `Bearer ${token}` });
}

// 회원가입
  @Post('signup')
  async signUp(@Body() body: any) {
    const { email, password } = body;
    const newUser = await this.userService.signUp(email, password);
    return ResponseFormat.buildResponse(newUser);
  }
// 로그인
  @Post('login')
  async signIn(@Body() body: any) {
    const { email, password } = body;
    const token = await this.userService.signIn(email, password);
    return ResponseFormat.buildResponse({ token: `Bearer ${token}` });
  }
// 회원 정보 조회
@Get('users/me')
@UseGuards(JwtAuthGuard)
async getUserInfo(@Req() req) {
  const user = req.user; // 요청 객체에서 유저 정보 추출
  const userInfo = await this.userService.getUserInfo(user.email);
  return ResponseFormat.buildResponse(userInfo);
}


// 회원 정보 수정
  @Patch('users/me')
  @UseGuards(JwtAuthGuard)
  async putUserInfo(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const { nickname, tag } = updateUserDto;
    const user = await this.userService.updateUserInfo(req.user.email, {nickname, tag});
    return ResponseFormat.buildResponse(user);
  }

//사용자 신고 카운트 증가
  @Patch('users/complaint/:reviewId')
  @UseGuards(JwtAuthGuard)
  async patchUserComplaint(req: Request, @Param('reviewId') reviewId: string) {
    const patchedUserComplaint = await this.userService.incrementComplaintByReviewId(reviewId);
    return ResponseFormat.buildResponse(patchedUserComplaint);
  }

  // 회원 탈퇴
  @Patch('/users/me/withdrawal')
  @UseGuards(JwtAuthGuard)
  async patchUserInfo(@Req() req) {
      const email = req.user.email;
      const user = await this.userService.patchUserInfo(email);
      return ResponseFormat.buildResponse(user);
    } 

// 관리자 모든 회원 정보 조회
  @Get('/admin/users')
  @UseGuards(JwtAuthGuard)
  async getUsers(@Req() req) {
      const users = await this.userService.getUsers();
      return ResponseFormat.buildResponse(users);
  }
//관리자 회원 삭제
  @Delete('/admin/users/:userId')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('userId') userId: string) {
      const user = await this.userService.deleteUser(userId);
      return ResponseFormat.buildResponse(user);
    }
  
  //로그아웃
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req, @Res() res) {
    try {
      // 토큰 유효성 확인 후 클라이언트에게 응답
      res.status(200).json({ message: '토큰이 유효합니다. 로그아웃 되었습니다.' });
      req.token = null;
      if (req.user.authMethod === 'kakao') {
        // 카카오 회원 로그아웃 처리
        const kakaoAccessToken = req.user.kakaoAccessToken; // 백엔드에서 받은 카카오 액세스 토큰
        await this.userService.kakaoLogout(kakaoAccessToken);
      }
    } catch (error) {
      // 토큰이 유효하지 않은 경우
      console.error('토큰 검증 오류:', error);
      res.status(403).json({ error: '토큰이 유효하지 않습니다.' });
    }
  }
}
