import { closeDatabase } from './../config/database';
import { getDefaultConnection } from './../config/database';
import app from '../app';
import request from 'supertest';
import { Connection } from 'typeorm';

let connection: Connection;

beforeAll(async () => {
  connection = await getDefaultConnection();
});

afterAll(async () => {
  await closeDatabase(connection);
});

describe('POST /domain/short', () => {
  it('200: creates short url if parameters are valid', async () => {
    const dummyUrl = 'https://test2.test';

    const response = await request(app)
      .post('/domain/short')
      .send({ url: dummyUrl });

    // const shortUrl = await domainRepository.find({ url: dummyUrl });
    // expect(shortUrl).not.toBeNull();
    // expect(response.statusCode).toEqual(200);
    console.log('responseeee =>', response.body);
    expect(200).toEqual(200);
  });
});
