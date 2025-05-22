import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SingInDto } from './dto/sing-in.dto';
import { Request, Response } from 'express';
import { CreateTeacherDto } from '../teacher/dto/create-teacher.dto';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Mutation("admin-sing-up")
  async singUpAdmin(@Body() cretaeAdminDto: CreateAdminDto) {
    return this.authService.singUpAdmin(cretaeAdminDto);
  }

  @Mutation("admin-sing-in")
  async singInAdmin(
    @Args() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInAdmin(singInDto, res);
  }

  @Mutation("admin-sing-out")
  async singOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutAdmin(req, res);
  }

  @Mutation("admin-refresh")
  async AdminrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminrefreshToken(req, res);
  }

  //-------------------------------------------------------------------------------------------------

  @Mutation("teacher-sing-up")
  async singUpTeacher(@Body() cretaeTeacherDto: CreateTeacherDto) {
    return this.authService.singUpTeacher(cretaeTeacherDto);
  }

  @Mutation("teacher-sing-in")
  async singInTeacher(
    @Args() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInTeacher(singInDto, res);
  }

  @Mutation("teacher-sing-out")
  async singOutTeacher(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutTeacher(req, res);
  }

  @Mutation("teacher-refresh")
  async TeacherrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.TeacherrefreshToken(req, res);
  }
}
