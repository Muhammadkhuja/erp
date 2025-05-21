import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { password, confirm_password, ...otherData } = createTeacherDto;
    if (password !== confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.teacherRepo.save({
      ...otherData,
      hashed_password,
    });
  }

  findAll() {
    return this.teacherRepo.find();
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepo.findOneBy({ id });
    if (!teacher) {
      throw new NotFoundException("Teacher topilmadi");
    }
    return teacher;
  }

  async findTeacherByEmail(email: string) {
    const teacher = await this.teacherRepo.findOne({ where: { email } });
    return teacher;
  }

  async findTeacherByRefresh(refresh_token: string) {
    const teachers = await this.teacherRepo.find();

    for (const teacher of teachers) {
      const match = await bcrypt.compare(refresh_token, teacher.refresh_token);
      if (match) return teacher;
    }

    return null;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const update = await this.teacherRepo.update(id, updateTeacherDto);
    if (!update) {
      throw new NotFoundException("Teacher topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.teacherRepo.delete(id);
    if (!delet) {
      throw new NotFoundException("Teacher topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }
}
