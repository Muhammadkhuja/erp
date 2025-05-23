import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/entities/admin.entity";
import { AuthModule } from "./auth/auth.module";
import { TeacherModule } from "./teacher/teacher.module";
import { Teacher } from "./teacher/entities/teacher.entity";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AttendancesModule } from './attendances/attendances.module';
import { TeachergroupsModule } from './teachergroups/teachergroups.module';
import { StudentgroupsModule } from './studentgroups/studentgroups.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "dis/**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),

    AdminModule,

    AuthModule,

    TeacherModule,

    StudentsModule,

    CoursesModule,

    GroupsModule,

    SchedulesModule,

    AttendancesModule,

    TeachergroupsModule,

    StudentgroupsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
