const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase);

test('Should sighup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'bob',
			email: 'boba@example.com',
			password: 'Mypass777',
		})
		.expect(201);
	// Assert that the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Assert about the response
	expect(response.body).toMatchObject({
		user: {
			name: 'bob',
			email: 'boba@example.com',
		},
		token: user.tokens[0].token,
	});
	expect(user.password).not.toBe('Mypass777');
});

test('login existing user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user).not.toBeNull();

	expect(response.body).toMatchObject({
		token: user.tokens[1].token,
	});
});

test('fail login nonexisting user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: 'nonExist',
			password: 'iiuusB87',
		})
		.expect(400);
});

test('get profile for user', async () => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test('fail get profile for unauthenticated user', async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('delete an account for user', async () => {
	await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('fail to delete profile for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/profile-pic.jpg')
		.expect(200);

	const user = await User.findById(userOneId)

	expect(user.avatar).toEqual(expect.any(Buffer))

});

test('update valid user fields', async () =>{
	const response = await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'Jess'
		})
		.expect(200)

	const user = await User.findById(userOneId)
	expect(user.name).toEqual('Jess')
})

test('fail update invalid user fields', async () =>{
	const response = await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			location: 'Kyiv'
		})
		.expect(400)

})
