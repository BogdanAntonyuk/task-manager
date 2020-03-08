const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

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

// const me = new User({
// 	name: '   boba1   ',
// 	email: 'MyEmail@mail.ru',
// 	password: 'passwor'

	
// });

// me.save()
// 	.then(result => {
// 		console.log(me);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required:true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
});

const firstTask = new Task({
	description: '    i am creating my first task with mongoose!    ',
});

firstTask
	.save()
	.then(result => {
		console.log(firstTask);
	})
	.catch(error => {
		console.log(error);
	});
