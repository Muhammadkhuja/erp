import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeworksubmissionsService } from './homeworksubmissions.service';
import { CreateHomeworksubmissionDto } from './dto/create-homeworksubmission.dto';
import { UpdateHomeworksubmissionDto } from './dto/update-homeworksubmission.dto';

@Controller('homeworksubmissions')
export class HomeworksubmissionsController {
  constructor(private readonly homeworksubmissionsService: HomeworksubmissionsService) {}

  @Post()
  create(@Body() createHomeworksubmissionDto: CreateHomeworksubmissionDto) {
    return this.homeworksubmissionsService.create(createHomeworksubmissionDto);
  }

  @Get()
  findAll() {
    return this.homeworksubmissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworksubmissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeworksubmissionDto: UpdateHomeworksubmissionDto) {
    return this.homeworksubmissionsService.update(+id, updateHomeworksubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeworksubmissionsService.remove(+id);
  }
}
