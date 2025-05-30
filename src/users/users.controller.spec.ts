import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUser: UserDto = {
    name: 'Budi',
    email: 'budi@gmail.com',
    birthday: '2022-09-27',
    timezone: 'America/New_York',
  };

  const usersServiceMock = {
    create: jest.fn().mockImplementation((dto: UserDto) => ({
      id: '1',
      ...dto,
    })),
    findOne: jest.fn().mockImplementation((id: string) => ({
      id,
      ...mockUser,
    })),
    update: jest.fn().mockImplementation((id: string, dto: UserDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn().mockImplementation((id: string) => ({
      deleted: true,
      id,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call usersService.create and return the result', async () => {
      const result = await usersController.create(mockUser);
      expect(usersService.create).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ id: '1', ...mockUser });
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne and return the result', async () => {
      const result = await usersController.findOne('1');
      expect(usersService.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual({ id: '1', ...mockUser });
    });
  });

  describe('update', () => {
    it('should call usersService.update and return the result', async () => {
      const updatedUser: UserDto = {
        ...mockUser,
        name: 'Andi',
      };
      const result = await usersController.update('1', updatedUser);
      expect(usersService.update).toHaveBeenCalledWith('1', updatedUser);
      expect(result).toEqual({ id: '1', ...updatedUser });
    });
  });

  describe('remove', () => {
    it('should call usersService.remove and return the result', async () => {
      const result = await usersController.remove('1');
      expect(usersService.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual({ deleted: true, id: '1' });
    });
  });
});