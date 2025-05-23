import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentgroupsService } from './studentgroups.service';
import { CreateStudentgroupDto } from './dto/create-studentgroup.dto';
import { UpdateStudentgroupDto } from './dto/update-studentgroup.dto';

@Controller('studentgroups')
export class StudentgroupsController {
  constructor(private readonly studentgroupsService: StudentgroupsService) {}

  @Post()
  create(@Body() createStudentgroupDto: CreateStudentgroupDto) {
    return this.studentgroupsService.create(createStudentgroupDto);
  }

  @Get()
  findAll() {
    return this.studentgroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentgroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentgroupDto: UpdateStudentgroupDto) {
    return this.studentgroupsService.update(+id, updateStudentgroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentgroupsService.remove(+id);
  }
}
