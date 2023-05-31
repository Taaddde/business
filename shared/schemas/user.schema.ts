import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IUser {
    email: string;
    password?: string;
}

export type UserDocument = HydratedDocument<IUser>;

@Schema()
export class User {
  @Prop({required: true})
  email: string;
  @Prop({required: true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IUserList {
    docs: IUser[];
    page: number;
    limit: number;
}