import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SingInDto } from './dto/sing-in.dto';
import { Request, Response } from 'express';
import { CreateTeacherDto } from '../teacher/dto/create-teacher.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("admin-sing-up")
  async singUpAdmin(@Body() cretaeAdminDto: CreateAdminDto) {
    return this.authService.singUpAdmin(cretaeAdminDto);
  }

  @Post("admin-sing-in")
  async singInAdmin(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInAdmin(singInDto, res);
  }

  @Post("admin-sing-out")
  async singOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutAdmin(req, res);
  }

  @Post("admin-refresh")
  async AdminrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminrefreshToken(req, res);
  }

  //-------------------------------------------------------------------------------------------------

  @Post("teacher-sing-up")
  async singUpTeacher(@Body() cretaeTeacherDto: CreateTeacherDto) {
    return this.authService.singUpTeacher(cretaeTeacherDto);
  }

  @Post("teacher-sing-in")
  async singInTeacher(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInTeacher(singInDto, res);
  }

  @Post("teacher-sing-out")
  async singOutTeacher(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutTeacher(req, res);
  }

  @Post("teacher-refresh")
  async TeacherrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.TeacherrefreshToken(req, res);
  }
}
