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
    const dummyUrl = 'https://test.test';

    const response = await request(app)
      .post('/domain/short')
      .send({ url: dummyUrl });

    expect(response.statusCode).toEqual(200);
  });
});

describe('GET /lookup', () => {
  it('200: looks up a valid url from the server', async () => {
    const dummyProcessedUrl = 'E9JMT6Nm';

    const response = await request(app).get(`/${dummyProcessedUrl}`);

    // Redirects to an actual url processed by the server
    expect(response.statusCode).toEqual(302);
  });

  it('404: fails if url is not found', async () => {
    const dummyProcessedUrl = 'notfounddd';

    const response = await request(app).get(`/${dummyProcessedUrl}`);

    console.log('response.body', response.data);
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toEqual('Not found');
  });
});
