import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
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

  @Column({nullable: true})
  refresh_token: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: true })
  is_creator: boolean;
}
