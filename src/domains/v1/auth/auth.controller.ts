import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Регистрация нового пользователя',
    description: 'Создание учетной записи с электронной почтой и паролем',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'Данные для регистрации',
  })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'user@example.com',
        createdAt: '2024-06-20T12:34:56.789Z',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Пользователь с таким email уже существует',
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации данных',
    schema: {
      example: {
        message: [
          'email должен быть электронной почтой',
          'Пароль недостаточно надежный',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Авторизация пользователя',
    description: 'Аутентификация по email и паролю',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Учетные данные пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешная аутентификация',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Неверные учетные данные',
    schema: {
      example: {
        message: 'Неправильный email или пароль',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации данных',
    schema: {
      example: {
        message: [
          'email должен быть электронной почтой',
          'password не должен быть пустым',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}