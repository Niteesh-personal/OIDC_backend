import mongoose, { Schema, Document } from 'mongoose';
import { UserDocument } from "./user.interface";

const UserSchema: Schema = new Schema(
    {
        email: { type: String },
        userName: { type: String },
        profileImage: { type: String },
        accessToken: { type: String },
        refreshToken: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model<UserDocument & Document>("softUser", UserSchema);

export default User;