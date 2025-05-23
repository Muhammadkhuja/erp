// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { TeachergroupsService } from './teachergroups.service';
// import { CreateTeachergroupDto } from './dto/create-teachergroup.dto';
// import { UpdateTeachergroupDto } from './dto/update-teachergroup.dto';

// @Controller('teachergroups')
// export class TeachergroupsController {
//   constructor(private readonly teachergroupsService: TeachergroupsService) {}

//   @Post()
//   create(@Body() createTeachergroupDto: CreateTeachergroupDto) {
//     return this.teachergroupsService.create(createTeachergroupDto);
//   }

//   @Get()
//   findAll() {
//     return this.teachergroupsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.teachergroupsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateTeachergroupDto: UpdateTeachergroupDto) {
//     return this.teachergroupsService.update(+id, updateTeachergroupDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.teachergroupsService.remove(+id);
//   }
// }
