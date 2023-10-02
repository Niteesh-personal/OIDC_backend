import { Document } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    userName: string;
    profileImage: string;
    accessToken: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}