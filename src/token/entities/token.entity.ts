import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: number;

    @Column()
    token: string;

    @Column()
    expiryDate: Date;

    @CreateDateColumn()
    createdAt: Date;
}
