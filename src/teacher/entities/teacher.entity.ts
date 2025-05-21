import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  hashed_password: string;

  @Column()
  role: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  refresh_token: string;
}
