const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	email:{
		type: String,
		require: true,
		trim: true,
		lowercase: true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email is not valid')
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value){
			if (value<0){
				throw new Error('Age must be positive number')
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value){
			if(value.includes('password')){
				throw new Error('Password could not contain \'password\'!')
			}
		}
	}
});

module.exports = User;