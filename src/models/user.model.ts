import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

userSchema.methods.toJSON = function () {
	const userObj = this.toObject();
	const { userId, _id, email, ...rest } = userObj;

	return {
		userId,
		email,
	};
};

export default model('User', userSchema);
