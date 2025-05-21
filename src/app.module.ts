import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from './admin/admin.module';
import { Admin } from "./admin/entities/admin.entity";
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from "./teacher/entities/teacher.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PH_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [Admin, Teacher],
      synchronize: true,
    }),

    AdminModule,

    AuthModule,

    TeacherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
