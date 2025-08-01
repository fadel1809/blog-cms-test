import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
  private readonly usersService: UserService,
  private readonly jwtService: JwtService,    
  ){}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username)
    if (user && await bcrypt.compare(pass, user.password)) {
      return user
    }
    return null;
  }
  async login(user:any){
    const payload = {username:user.username,sub:user.id};
    return{
      access_token: this.jwtService.sign(payload)
    }
  }
}
