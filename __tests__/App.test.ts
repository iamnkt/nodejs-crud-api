import supertest from 'supertest';
import { App } from '../src/model/app';
import { storage } from '../src/storage/storage';

const app = new App();
const request = supertest(app.createServer());

beforeEach(() => {
  storage.clearStorage();
});

describe('Test different scenarios', () => {
  test('Scenario 1: get users, create user, get created user, delete created user, try to get user again', async () => {
    const response1 = await request.get('/api/users');

    expect(response1.status).toBe(200);
    expect(response1.body).toHaveLength(0);

    const userData = {
      username: 'Vasya',
      age: 25,
      hobbies: ['reading', 'football'],
    };

    const response2 = await request.post('/api/users').send(userData);

    expect(response2.status).toBe(201);

    const userId = response2.body.id;
    const response3 = await request.get(`/api/users/${userId}`);

    expect(response3.status).toBe(200);
    expect(response3.body.username).toBe('Vasya');

    const response4 = await request.delete(`/api/users/${userId}`);

    expect(response4.status).toBe(204);

    const response5 = await request.get(`/api/users/${userId}`);

    expect(response5.status).toBe(404);
    expect(response5.body).toBe('User with provided userId was not found');
  });

  test('Scenario 2: get users with invalid endpoint, create user with invalid data, get users, create user with valid data, '
        + 'get users, get user with invalid id, get created user', async () => {
    const response1 = await request.get('/api/user');

    expect(response1.status).toBe(404);
    expect(response1.body).toBe('Requested page not found');

    const userInvalidData = {
      username: 'Vasya',
      age: 25,
    };

    const response2 = await request.post('/api/users').send(userInvalidData);

    expect(response2.status).toBe(400);
    expect(response2.body).toBe('Request body is not valid');

    const userValidData = {
      username: 'Kolya',
      age: 30,
      hobbies: ['singing', 'driving'],
    };

    const response3 = await request.post('/api/users').send(userValidData);

    expect(response3.status).toBe(201);

    const response4 = await request.get('/api/users');

    expect(response4.status).toBe(200);
    expect(response4.body).toHaveLength(1);

    const invalidUserId = '1234567890';

    const response5 = await request.get(`/api/users/${invalidUserId}`);

    expect(response5.status).toBe(400);
    expect(response5.body).toBe('userId is not valid');

    const userId = response3.body.id;

    const response6 = await request.get(`/api/users/${userId}`);

    expect(response6.status).toBe(200);
    expect(response6.body.age).toBe(30);
  });

  test('Scenario 3: get users, create user, update user, get user with created user id, get users', async () => {
    const response1 = await request.get('/api/users');

    expect(response1.status).toBe(200);
    expect(response1.body).toHaveLength(0);

    const userData = {
      username: 'Dima',
      age: 27,
      hobbies: ['running'],
    };

    const response2 = await request.post('/api/users').send(userData);

    expect(response2.status).toBe(201);

    const userId = response2.body.id;

    const newUserData = {
      username: 'Dima',
      age: 28,
      hobbies: ['nodejs'],
    };

    const response3 = await request.put(`/api/users/${userId}`).send(newUserData);

    expect(response3.status).toBe(200);

    const response4 = await request.get(`/api/users/${userId}`);

    expect(response4.status).toBe(200);
    expect(response4.body.age).toBe(28);

    const response5 = await request.get('/api/users');

    expect(response5.status).toBe(200);
    expect(response5.body).toHaveLength(1);
  });
});
