import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../database/prisma.service';
import { UserQueryParamsDto } from './dto/args/user-query-params.dto';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepository, PrismaService],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const findManySpy = jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue([]);

      const countSpy = jest
        .spyOn(prismaService.user, 'count')
        .mockResolvedValue(0);

      const userQueryParamsDto: UserQueryParamsDto = { skip: 0, take: 10 };
      const result = await usersRepository.findAll(userQueryParamsDto);

      expect(result).toEqual({ data: [], total: 0 });

      expect(findManySpy).toHaveBeenCalledWith({
        skip: userQueryParamsDto.skip,
        take: userQueryParamsDto.take,
        where: {},
      });

      expect(countSpy).toHaveBeenCalledWith({ where: {} });
    });
  });

  // TODO: Add more tests for findOneByEmail, findOneByID, create, update
});
