import { Injectable } from '@nestjs/common';
import { HttpMessage } from './helpers';

@Injectable()
export class AppService {
  getStatus(): HttpMessage {
    return { message: 'TODOLIST BACKEND ACTIVE' };
  }
}
