import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('protected')
  getProtectedResource() {
    return { message: 'This is a protected resource' };
  }
}
