import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from '../src/components/user/user.service';
import { JWTService } from '../../../shared/modules/jwt/jwt.service';
import { CryptService } from '../../../shared/modules/crypt/crypt.service';

describe('ApiController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let jwtService: JWTService;
  let cryptService: CryptService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UserService>(UserService);
    jwtService = moduleFixture.get<JWTService>(JWTService);
    cryptService = moduleFixture.get<CryptService>(CryptService);
  });

  describe('/users/register (POST)', () => {
    it('should register a new user successfully', () => {
      jest.spyOn(userService, 'checkExists').mockResolvedValue(null);
      jest
        .spyOn(userService, 'saveUser')
        .mockResolvedValue({ email: 'bruce@wayne.com' });
      return request(app.getHttpServer())
        .post('/users/register')
        .send({ email: 'bruce@wayne.com', password: 'imbatman123' })
        .expect(201);
    });

    it('should return an error if email is already taken', () => {
      jest
        .spyOn(userService, 'checkExists')
        .mockResolvedValue({ email: 'bruce@wayne.com' });
      return request(app.getHttpServer())
        .post('/users/register')
        .send({ email: 'bruce@wayne.com', password: 'imbatman123' })
        .expect(409);
    });

    it('should return an error if password is not a string', () => {
      jest.spyOn(userService, 'checkExists').mockResolvedValue(null);
      jest.spyOn(userService, 'saveUser').mockResolvedValue({ email: 'ta' });
      return request(app.getHttpServer())
        .post('/users/register')
        .send({ email: 'bruce_wayne', password: 'imbatman123' })
        .expect(400)
        .expect(
          '{"statusCode":400,"message":"Invalid email format","error":"Bad Request"}',
        );
    });

    it('should return an error if password is not a string', () => {
      jest.spyOn(userService, 'checkExists').mockResolvedValue(null);
      jest.spyOn(userService, 'saveUser').mockResolvedValue({ email: 'ta' });
      return request(app.getHttpServer())
        .post('/users/register')
        .send({ email: 'bruce@wayne.com', password: 1 })
        .expect(400)
        .expect(
          '{"statusCode":400,"message":"Invalid password format","error":"Bad Request"}',
        );
    });
  });

  describe('/users/login (POST)', () => {
    it('should login successfully', () => {
      jest
        .spyOn(jwtService, 'getAccessToken')
        .mockResolvedValue('a_real_access_token');
      jest.spyOn(cryptService, 'comparePasswords').mockResolvedValue(true);
      jest.spyOn(userService, 'checkExists').mockResolvedValue({
        email: 'bruce@wayne.com',
        password: 'imbatman123',
      });
      return request(app.getHttpServer())
        .post('/users/login')
        .send({ email: 'bruce@wayne.com', password: 'imbatman123' })
        .expect(201);
    });

    it('should wrong login', () => {
      jest.spyOn(cryptService, 'comparePasswords').mockResolvedValue(false);
      jest.spyOn(userService, 'checkExists').mockResolvedValue({
        email: 'bruce@wayne.com',
        password: 'imsuperman123',
      });
      return request(app.getHttpServer())
        .post('/users/login')
        .send({ email: 'bruce@wayne.com', password: 'imbatman123' })
        .expect(401);
    });
  });
});
