import { PartialType } from '@nestjs/mapped-types';
import { CreateTeachergroupDto } from './create-teachergroup.dto';

export class UpdateTeachergroupDto extends PartialType(CreateTeachergroupDto) {}
