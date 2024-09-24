import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
});

userSchema.methods.toJSON = function () {
	const userObj = this.toObject();
	const { userId, _id, ...rest } = userObj;

	return {
		userId,
	};
};

export default model('User', userSchema);
