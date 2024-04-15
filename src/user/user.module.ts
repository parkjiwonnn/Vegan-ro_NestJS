import { Controller, Module } from "@nestjs/common";

@Module{
    imports: [] 여기는 다른 모듈 사용하려고 넣음,
    controllers: [
        UserController
    ],
    
}
export class UserModule {}