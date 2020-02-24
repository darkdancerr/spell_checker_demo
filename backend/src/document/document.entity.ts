import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Document{
    constructor(content: Buffer) {
        this.content = content;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'bytea'})
    content: Buffer;
}
