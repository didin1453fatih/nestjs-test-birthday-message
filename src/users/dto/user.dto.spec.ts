import { validate } from 'class-validator';
import { UserDto } from './user.dto';

describe('UserDto Validation', () => {
  it('should validate a correct dto', async () => {
    const dto = new UserDto();
    dto.name = 'Budi';
    dto.email = 'budi@gmail.com';
    dto.birthday = '2022-09-27';
    dto.timezone = 'America/New_York';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should invalidate missing fields', async () => {
    const dto = new UserDto();
    // missing all fields

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const errorProps = errors.map(e => e.property);
    expect(errorProps).toEqual(expect.arrayContaining(['name', 'email', 'birthday', 'timezone']));
  });

  it('should invalidate incorrect email', async () => {
    const dto = new UserDto();
    dto.name = 'Budi';
    dto.email = 'not-an-email';
    dto.birthday = '2022-09-27';
    dto.timezone = 'America/New_York';

    const errors = await validate(dto);
    expect(errors.find(e => e.property === 'email')).toBeDefined();
  });

  it('should invalidate incorrect birthday format', async () => {
    const dto = new UserDto();
    dto.name = 'Budi';
    dto.email = 'budi@gmail.com';
    dto.birthday = '27-09-2022'; // not ISO8601
    dto.timezone = 'America/New_York';

    const errors = await validate(dto);
    expect(errors.find(e => e.property === 'birthday')).toBeDefined();
  });

  it('should invalidate incorrect timezone', async () => {
    const dto = new UserDto();
    dto.name = 'Budi';
    dto.email = 'budi@gmail.com';
    dto.birthday = '2022-09-27';
    dto.timezone = 'Not/A_Timezone';

    const errors = await validate(dto);
    expect(errors.find(e => e.property === 'timezone')).toBeDefined();
  });
});