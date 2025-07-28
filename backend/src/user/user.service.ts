import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ){}
  async onModuleInit(){
    const admin = await this.userRepo.findOne({ where: { username: 'admin' } });
    if(!admin){
      const hashed = await bcrypt.hash('admin123',10);
      const user = this.userRepo.create({
        username:'admin',
        password:hashed
      })
      await this.userRepo.save(user)
    }
  }
  findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
}
