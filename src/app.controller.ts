import { Controller, Get, Req, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //프록시 처리
  @Get('proxy')
  proxy(@Headers('id') userId: string) {
    if (!userId) {
      throw new HttpException('Not found User', HttpStatus.BAD_REQUEST);
    };
    try {
      return this.appService.proxy(userId);
    } catch (error) {
      throw new HttpException('Rate Limit Exceeded', HttpStatus.TOO_MANY_REQUESTS);
    }
  }

  @Get('challenge1')
  challenge1(): number {
    return this.appService.challenge1();
  }

  @Get('challenge2')
  challenge2(): number {
    return this.appService.challenge2();
  }
}