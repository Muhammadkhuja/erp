import {
    BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { Admin } from "../admin/entities/admin.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SingInDto } from "./dto/sing-in.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { TeacherService } from "../teacher/teacher.service";
import { Teacher } from "../teacher/entities/teacher.entity";
import { CreateTeacherDto } from "../teacher/dto/create-teacher.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly teacherService: TeacherService,
    private readonly jwtService: JwtService
  ) {}

  async AdmingenerateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  //-------------------------------------------------------------------------------------------------

  async TeachergenerateToken(teacher: Teacher) {
    const payload = {
      id: teacher.id,
      is_active: teacher.is_active,
      role: teacher.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async singUpAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newAdmin = await this.adminService.create(createAdminDto);
    return { message: "Foydalanuvchi qo'shildi", adminId: newAdmin.id };
  }

  async singInAdmin(singInDto: SingInDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(singInDto.email);

    if (!admin) {
      throw new BadRequestException("Email yoki passwor hato");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      admin.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.AdmingenerateToken(admin);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      admin.refresh_token = hashed_refresh_token;
      await this.adminService.update(admin.id, admin);
    } catch (error) {
      console.log("Token da xatolik !?!");
    }

    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async singOutAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    const admin = await this.adminService.findAdminByRefresh(refresh_token);

    if (!admin) {
      throw new BadGatewayException("Token yoq yoki noto'g'ri");
    }
    admin.refresh_token = "";
    await this.adminService.update(admin.id, admin);

    res.clearCookie("refresh_token");

    return { message: "Siz endi yo'q siz !?" };
  }

  async AdminrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const admins = await this.adminService.findAll();
    const admin = admins.find(
      (admin) =>
        admin.refresh_token &&
        bcrypt.compareSync(refresh_token, admin.refresh_token)
    );

    if (!admin) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.AdmingenerateToken(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashed_refresh_token;
    await this.adminService.update(admin.id, admin);

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Token refresh token ga o'zgardi ",
      accessToken: tokens.accessToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async singUpTeacher(createTeacherDto: CreateTeacherDto) {
    const candidate = await this.teacherService.findTeacherByEmail(
      createTeacherDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newTeacher = await this.teacherService.create(createTeacherDto);
    return { message: "Foydalanuvchi qo'shildi", teacherId: newTeacher.id };
  }

  async singInTeacher(singInDto: SingInDto, res: Response) {
    const teacher = await this.teacherService.findTeacherByEmail(
      singInDto.email
    );

    if (!teacher) {
      throw new BadRequestException("Email yoki passwor hato");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      teacher.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.TeachergenerateToken(teacher);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      teacher.refresh_token = hashed_refresh_token;
      await this.teacherService.update(teacher.id, teacher);
    } catch (error) {
      console.log("Token da xatolik !?!");
    }

    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async singOutTeacher(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    const teacher =
      await this.teacherService.findTeacherByRefresh(refresh_token);

    if (!teacher) {
      throw new BadGatewayException("Token yoq yoki noto'g'ri");
    }
    teacher.refresh_token = "";
    await this.teacherService.update(teacher.id, teacher);

    res.clearCookie("refresh_token");

    return { message: "Siz endi yo'q siz !?" };
  }

  async TeacherrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const teachers = await this.teacherService.findAll();
    const teacher = teachers.find(
      (teacher) =>
        teacher.refresh_token &&
        bcrypt.compareSync(refresh_token, teacher.refresh_token)
    );

    if (!teacher) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.TeachergenerateToken(teacher);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    teacher.refresh_token = hashed_refresh_token;
    await this.teacherService.update(teacher.id, teacher);

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Token refresh token ga o'zgardi ",
      accessToken: tokens.accessToken,
    };
  }
}
