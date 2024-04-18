import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ImageRepository } from '../image/image.repository';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly imageRepository: ImageRepository,
    private readonly configService: ConfigService,
  ) {}

  async handleKakaoLogin(code: string): Promise<string> {
    try {
      const kakaoUserInfo = await this.requestUserInfoFromKakao(code);
      const token = await this.generateTokenFromKakaoUserInfo(kakaoUserInfo);
      return token;
    } catch (error) {
      console.error('Error processing Kakao login:', error);
      throw new BadRequestException('Internal Server Error');
    }
  }

  async requestUserInfoFromKakao(code: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('client_id', this.configService.get<string>('KAKAO_ID'));
      params.append('redirect_uri', this.configService.get<string>('KAKAO_URL'));
      params.append('code', code);

      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const accessToken = response.data.access_token;

      const userInfoResponse = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return userInfoResponse.data;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      if (error.response) {
        console.error(`Response Status: ${error.response.status}`);
        console.error(`Response Data: ${JSON.stringify(error.response.data)}`);
      }
      throw new BadRequestException('Error requesting user info from Kakao');
    }
  }

  async generateTokenFromKakaoUserInfo(kakaoUserInfo: any): Promise<string> {
    try {
      const kakaoEmail = kakaoUserInfo.kakao_account.email;

        if (!kakaoEmail) {
            throw new Error('카카오 사용자 정보에 이메일이 없습니다.');
        }

        const exUser = await this.userRepository.findUserOne(kakaoEmail);
        if (exUser) {
            const token = jwt.sign(
                {
                    userId: exUser._id,
                    email: exUser.email,
                    isAdmin: exUser.is_admin,
                },
                this.configService.get<string>('JWT_SECRET'),
                {
                    expiresIn: '6h',
                },
            );
            return token;
        }
        const newUser = await this.userRepository.createUserForKakao(kakaoEmail);

        const token = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.email,
                isAdmin: newUser.is_admin,
            },
            this.configService.get<string>('JWT_SECRET'),
            {
                expiresIn: '6h',
            },
        );
        console.log('Generated token:', token);
        return token;
    } catch (error) {
        console.error('카카오 사용자 정보에서 토큰 생성 중 오류 발생:', error);
        throw new BadRequestException('카카오 사용자 정보에서 토큰 생성 중 오류 발생');
    }
}


  async signUp(email: string, plainPassword: string): Promise<any> {
    try {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('중복된 이메일입니다.');
      }
      const hashedPassword = await bcrypt.hash(plainPassword, 8);
      const newUser = await this.userRepository.createUser({
        email,
        password: hashedPassword,
      });
      return { message: '회원가입이 성공적으로 완료되었습니다.', newUser };
    } catch (error) {
      console.error('Error signing up:', error);
      throw new BadRequestException('회원가입 중 오류가 발생했습니다.');
    }
  }

  async signIn(email: string, plainPassword: string): Promise<string> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }
      const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('잘못된 비밀번호입니다.');
      }
      const tokenPayload = {
        userId: user._id,
        email: user.email,
        isAdmin: user.is_admin,
      };
      const token = jwt.sign(tokenPayload, this.configService.get<string>('JWT_SECRET'), {
        expiresIn: '6h',
      });
      return token;
    } catch (error) {
      console.error('Error signing in:', error);
      throw new BadRequestException('로그인 중 오류가 발생했습니다.');
    }
  }

  
  async updateUserInfo(email: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
  
    if (!user) {
      throw new NotFoundException('해당 회원이 존재하지 않습니다');
    }
  
    // updateUserDto에서 tag 값을 추출
    const { tag } = updateUserDto;
  
    // tag 값에 해당하는 이미지를 가져온다
    let tagImg = null;
    if (tag) {
      const tagImage = await this.imageRepository.getImageByName(tag);
      if (tagImage) {
        tagImg = tagImage.url; // 가정: getImageByName 메소드가 이미지 객체를 반환하고, 이 객체에는 이미지 URL이 포함되어 있다
      }
    }
  
    // 사용자 정보를 업데이트하기 위해 updateUserDto를 사용하되, tagImg도 함께 업데이트한다
    // 이 단계에서는 updateByEmail 메소드의 구현 또는 사용자 모델이 tagImg를 처리할 수 있어야 한다
    const updatedUserInfo = await this.userRepository.updateByEmail(email, {
      ...updateUserDto,
      tagImg, // 태그 이미지 정보도 업데이트
    });
  
    return {
      message: '회원정보 수정이 성공적으로 완료되었습니다.',
      updatedUserInfo,
    };
  }
  
  async getUserInfo(email: string): Promise<any> {
    const userInfo = await this.userRepository.findByEmail(email);
    const { password, ...userInfoWithoutSensitive } = userInfo;
    return userInfoWithoutSensitive;
  }

  async patchUserInfo(email: string): Promise<any> {
    const patchedUser = await this.userRepository.patchByEmail(email);

    if (!patchedUser) {
      throw new NotFoundException('해당 회원이 존재하지 않습니다');
    }

    return { message: '회원정보가 성공적으로 삭제되었습니다.', patchedUser };
  }

  async incrementComplaintByReviewId(reviewId: string): Promise<any> {
    const userId = await this.userRepository.getUserIdByReviewId(reviewId);
    const patchedUserComplaint = await this.userRepository.incrementComplaintById(userId);
    if (!patchedUserComplaint) {
      throw new NotFoundException('해당 회원이 존재하지 않습니다');
    }
    return { message: '리뷰 신고가 성공적으로 완료되었습니다.', patchedUserComplaint };
  }

  async getUsers(): Promise<any> {
    const users = await this.userRepository.allUsers();
    if (users.length === 0) {
      throw new NotFoundException('회원 목록이 존재하지 않습니다.');
    }
    return users;
  }

  async deleteUser(id: string): Promise<any> {
    const deletedUser = await this.userRepository.deleteById(id);

    if (!deletedUser) {
      throw new NotFoundException('해당 회원이 존재하지 않습니다');
    }

    return { message: '회원정보가 성공적으로 삭제되었습니다.', deletedUser };
  }
  async kakaoLogout(accessToken) {
    try {
        const response = await axios.post('https://kapi.kakao.com/v1/user/logout', null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('카카오 로그아웃 성공:', response.data);
    } catch (error) {
        console.error('카카오 로그아웃 실패:', error.response.data);
    }
  }
}
