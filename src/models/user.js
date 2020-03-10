const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error('Email is not valid');
         }
      },
   },
   age: {
      type: Number,
      default: 0,
      validate(value) {
         if (value < 0) {
            throw new Error('Age must be positive number');
         }
      },
   },
   password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
         if (value.includes('password')) {
            throw new Error("Password could not contain 'password'!");
         }
      },
   },
});

userSchema.pre('save', async function (next){
	const user = this;

	console.log('Just before saving!');

	next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
