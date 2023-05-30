import { Schema, model } from 'mongoose';

export interface IUser {
    email: string;
    password?: string;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

export const UserModel = model('User', UserSchema);

export interface IUserList {
    docs: IUser[];
    page: number;
    totalDocs: number;
    limit: number;
    nextPage: number;
    prevPage: number;
    totalPages: number;
    pagingCounter: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}