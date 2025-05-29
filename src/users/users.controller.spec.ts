// // import { Test, TestingModule } from '@nestjs/testing';
// // import { UsersController } from './users.controller';
// // import { UsersService } from './users.service';
// // import { BadRequestException } from '@nestjs/common';

// // describe('UserController', () => {
// //     let controller: UsersController;
// //     let userService: UsersService;

// //     beforeEach(async () => {
// //         const module: TestingModule = await Test.createTestingModule({
// //             controllers: [UsersController],
// //             providers: [
// //                 {
// //                     provide: UsersService,
// //                     useValue: {
// //                         createUser: jest.fn().mockImplementation(dto => ({
// //                             id: '1',
// //                             ...dto,
// //                         })),
// //                     },
// //                 },
// //             ],
// //         }).compile();

// //         controller = module.get<UsersController>(UsersController);
// //         userService = module.get<UsersService>(UsersService);
// //     });

// //     // Tests go here

// //     describe('createUser', () => {
// //         const validDto = {
// //             name: "Budi kedua",
// //             email: "budiaro@gmail.com",
// //             birthday: "2022-09-27",
// //             timezone: "America/New_York"
// //         };

// //         // Test valid input
// //         it('should create a user with valid input', async () => {
// //             // controller.create(validDto)
// //             await expect(controller.create(validDto)).resolves.toBeDefined();
// //             // expect(userService.create).toHaveBeenCalledWith(validDto);
// //         });

// //         // // Test invalid email
// //         // it('should reject invalid email', async () => {
// //         //   const invalidDto = { ...validDto, email: 'invalid-email' };
// //         //   await expect(controller.createUser(invalidDto)).rejects.toThrow(
// //         //     BadRequestException,
// //         //   );
// //         //   await expect(controller.createUser(invalidDto)).rejects.toThrow(
// //         //     'Invalid email format',
// //         //   );
// //         // });

// //         // // Test invalid timezone
// //         // it('should reject invalid timezone', async () => {
// //         //   const invalidDto = { ...validDto, timezone: 'Invalid/Zone' };
// //         //   await expect(controller.createUser(invalidDto)).rejects.toThrow(
// //         //     BadRequestException,
// //         //   );
// //         //   await expect(controller.createUser(invalidDto)).rejects.toThrow(
// //         //     'Invalid timezone',
// //         //   );
// //         // });

// //         // // Test invalid birthday
// //         // it('should reject non-date birthday', async () => {
// //         //   const invalidDto = { ...validDto, birthday: 'not-a-date' };
// //         //   await expect(controller.createUser(invalidDto)).rejects.toThrow(
// //         //     BadRequestException,
// //         //   );
// //         //   await expect(controller.createUser(invalidDto)).rejects.toThrow(
// //         //     'Birthday must be a valid date',
// //         //   );
// //         // });
// //     });
// // });

// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { BadRequestException } from '@nestjs/common';
// import { ValidationPipe } from '@nestjs/common';

// import { APP_PIPE } from '@nestjs/core';

// // import { UsersService } from './users.service';
// // import { AgendaService } from '../agenda/agenda.service';

// describe('AppController', () => {
//     let userController: UsersController;
//     let usersService: UsersService;

//     beforeEach(async () => {
//         const app: TestingModule = await Test.createTestingModule({
//             controllers: [UsersController],
//             providers: [
//                 UsersService
//                 ,
//                 {
//                     provide: APP_PIPE,
//                     useClass: ValidationPipe,
//                   },
//                 {
//                     provide: UsersService,
//                     useValue: {
//                         create: jest.fn().mockImplementation(dto => ({
//                           id: '1',
//                           ...dto,
//                         })),
//                       },                    
//                     // useValue: {
//                     //     create: jest.fn().mockResolvedValue({
//                     //         id: '1',
//                     //         name: "Budi kedua",
//                     //         email: "budiaro@gmail.com",
//                     //         birthday: "2022-09-27sss",
//                     //         timezone: "America/New_York"
//                     //     }),
//                     // }
//                 }

//             ]
//         }).compile();

//         userController = app.get<UsersController>(UsersController);
//     });

//     describe('User', () => {
//         it('should create a user with valid input', () => {
//             const validDto = {
//                 name: "Budi kedua",
//                 email: "budiaro@gmail.com",
//                 birthday: "2022-09-27",
//                 timezone: "America/New_Yorkk"
//             };
//             const result=expect(userController.create(validDto))
//             // console.log(result)
//         });


//         // it('should throw for invalid email', async () => {
//         //     const invalidDto = {
//         //         name: "Budi kedua",
//         //         email: "budiarogmailcom",
//         //         birthday: "2022-09-27",
//         //         timezone: "America/New_Yorkk"
//         //     };
      
//         //     // await expect(userController.create(invalidDto))
//         //     //   .rejects
//         //     //   .toThrowError(BadRequestException);
            
//         //     await expect(userController.create(invalidDto))
//         //       .rejects
//         //       .toEqual(expect.objectContaining({
//         //         response: {
//         //           message: ['email must be an email'],
//         //           error: 'Bad Request',
//         //           statusCode: 400,
//         //         },
//         //       }));
//         //   });        


// // Test invalid email
// //   it('should reject invalid email', async () => {
// //     const invalidDto = {
// //         name: "Budi kedua",
// //         email: "budiaro@gmailgone",
// //         birthday: "2022-09-27",
// //         timezone: "America/New_Yorkk"
// //     };
// //     await expect(userController.create(invalidDto)).rejects.toThrow(
// //       BadRequestException,
// //     );
// //     await expect(userController.create(invalidDto)).rejects.toThrow(
// //       'Invalid email format',
// //     );
// //   });        
//     });
// });



// // import { Test, TestingModule } from '@nestjs/testing';
// // import { UsersController } from './users.controller';
// // import { UsersService } from './users.service';

// // describe('UsersController', () => { // Changed from 'AppController'
// //     let controller: UsersController;
// //     let service: UsersService;

// //     beforeEach(async () => {
// //         const module: TestingModule = await Test.createTestingModule({
// //             controllers: [UsersController],
// //             providers: [
// //                 // Mock UsersService and its dependencies
// //                 {
// //                     provide: UsersService,
// //                     useValue: {
// //                         create: jest.fn().mockResolvedValue({
// //                             id: '1',
// //                             name: "Budi kedua",
// //                             email: "budiaro@gmail.com",
// //                             birthday: "2022-09-27sss",
// //                             timezone: "America/New_York"
// //                         })
// //                     }
// //                 },
// //                 // Add mock providers for AgendaService and UserModel if needed
// //                 {
// //                     provide: 'AgendaService', // Use the correct injection token
// //                     useValue: {} // Mock implementation
// //                 },
// //                 {
// //                     provide: 'UserModel', // Use the correct injection token
// //                     useValue: {} // Mock implementation
// //                 }
// //             ],
// //         }).compile();

// //         controller = module.get<UsersController>(UsersController);
// //         service = module.get<UsersService>(UsersService);
// //     });

// //     describe('createUser', () => {
// //         it('should create a user with valid input', async () => {
// //             const validDto = {
// //                 name: "Budi kedua",
// //                 email: "budiaro@gmail.com",
// //                 birthday: "2022-09-27ksksk",
// //                 timezone: "America/New_York"
// //             };
            
// //             const result = await controller.create(validDto);
// //             // expect(result).toBeDefined();
// //             console.log(result)
// //             // expect(service.create).toHaveBeenCalledWith(validDto);
// //         });
// //     });
// // });



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