import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from '../src/components/user/user.service';

describe('ApiController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UserService>(UserService);
  });

  describe('/register (POST)', () => {
    it('should register a new user successfully', () => {
      jest.spyOn(userService, 'checkExists').mockResolvedValue(null);
      jest.spyOn(userService, 'saveUser').mockResolvedValue({ email: 'bruce@wayne.com' });
      return request(app.getHttpServer())
        .post('/users/register')
        .send({email: 'bruce@wayne.com', password: 'imbatman123'})
        .expect(201)
    });

    it('should return an error if email is already taken', () => {
      jest.spyOn(userService, 'checkExists').mockResolvedValue({ email: 'bruce@wayne.com'});
      return request(app.getHttpServer())
        .post('/users/register')
        .send({email: 'bruce@wayne.com', password: 'imbatman123'})
        .expect(409)
    });

    it('should return an error if password is not a string', () => {
      jest.spyOn(userService, 'checkExists').mockResolvedValue(null);
      jest.spyOn(userService, 'saveUser').mockResolvedValue({ email: 'ta' });
      return request(app.getHttpServer())
        .post('/users/register')
        .send({email: 'tadeeee', password: 1})
        .expect(201)
    });

    it('should return an error if password is not a string', () => {
      jest.spyOn(userService, 'checkExists').mockResolvedValue(null);
      jest.spyOn(userService, 'saveUser').mockResolvedValue({ email: 'ta' });
      return request(app.getHttpServer())
        .post('/users/register')
        .send({email: 'tadeeee', password: 'ta'})
        .expect(201)
    });
  });
});

