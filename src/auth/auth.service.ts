import { BadGatewayException, BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ){}

    async signIn(username:string pass: string):Promise<any>{
        try{
            const user = await this.userService.findOneByteUsername(username);
            const isValidPassword = bcrypt.compareSync(pass, user?.password);
            if(!isValidPassword){
                throw new UnauthorizedException();
            }

            const payload = {sub: user.id, username: user.username};

            return{
                access_token: await this.jwtService.signAsync(payload),
            };
        }catch (e){
            console.log(e);
            throw BadGatewayException;
        }
    }


    async signUp(
        username: string,
        password: string,
        firstname: string,
        lastname: string,
    ){
        try{
            const user = await this.userService.createUser(
                username,
                password,
                firstname,
                lastname,
            );

            delete user.password;

            return user;
        }catch(e){
            throw BadRequestException;
        }
    }
}
