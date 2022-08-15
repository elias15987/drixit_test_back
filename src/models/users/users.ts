import mongoose, { Schema } from "mongoose";

interface ClientUser {
	id: string;
	avatar: string;
	age: number;
	email: string;
	name: string;
	role: 'admin' | 'user'
  	surname: string;
}

export interface ServerUser extends ClientUser {
	password: string;
}

export const users: ServerUser[] = [{
	id: "it-drixit-1",
	avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
	email: "it@drixit.com",
	password: "some-password",
	name: "IT",
	surname: "Drixit",
	age: 25,
	role: "admin"
}, {
	id: "info-drixit-2",
	avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
	email: "info@drixit.com",
	password: "other-password",
	name: "Info",
	surname: "Drixit",
	age: 30,
	role: "user"
}];



const UserSchema :Schema = new Schema({
	id: { type:String, required:true },
	avatar: { type:String, required:true },
	age: { type:Number, required:true },
	email: { type:String, required:true },
	name: { type:String, required:true },
	role: { type:String, required:true },
  	surname: { type:String, required:true },
	password: { type:String, required:true },
});

export default mongoose.model<ServerUser>("User", UserSchema);