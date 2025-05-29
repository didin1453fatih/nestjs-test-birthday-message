import { Test, TestingModule } from '@nestjs/testing';
import { AgendaService } from './agenda.service';
import * as moment from 'moment-timezone';
import MockDate from 'mockdate';

describe('AgendaService', () => {
  let service: AgendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendaService],
    }).compile();

    service = module.get<AgendaService>(AgendaService);
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe('calculateNextBirthDay', () => {

    it('should calculate next birthday when birthday is in the future of current year', () => {
      const timezone = 'America/New_York';
      // Current date 2025-01-15
      MockDate.set('2025-01-15');

      // Birthday is 1990-03-20
      const birthday = new Date('1990-03-20');

      // Expected result: March 20, 2025 at 9:00 AM in the specified timezone
      const expectedDate = moment.tz('2025-03-20 09:00', 'YYYY-MM-DD HH:mm', timezone).toDate();

      const result = service.calculateNextBirthDay(birthday, timezone);

      expect(result.getTime()).toBe(expectedDate.getTime());
    });

    it('should calculate next birthday as next year when birthday has already passed this year', () => {
      const timezone = 'America/New_York';
      // Current date 2025-05-30
      MockDate.set('2025-05-30');

      // Birthday is March 20
      const birthday = new Date('1990-03-20');

      // Expected result: March 20, 2026 at 9:00 AM in the specified timezone
      const expectedDate = moment.tz('2026-03-20 09:00', 'YYYY-MM-DD HH:mm', timezone).toDate();

      const result = service.calculateNextBirthDay(birthday, timezone);

      expect(result.getTime()).toBe(expectedDate.getTime());
    });

    it('should calculate next birthday on the same day if birthday is today but before 9 AM', () => {
      const timezone = 'America/New_York';
      // 2025-03-20 07:00:00 UTC ==  2025-03-20 03:00:00 'America/New_York'
      const mockedUtcTime = moment.utc('2025-03-20 07:00:00', 'YYYY-MM-DD HH:mm:ss');
      MockDate.set(mockedUtcTime.toDate());

      // Birthday is March 20
      const birthday = new Date('1990-03-20');

      // Expected result: March 20, 2025 at 9:00 AM in the specified timezone
      const expectedDate = moment.tz('2025-03-20 09:00', 'YYYY-MM-DD HH:mm', timezone).toDate();

      const result = service.calculateNextBirthDay(birthday, timezone);

      expect(result.getTime()).toBe(expectedDate.getTime());
    });

    it('should calculate next birthday as next year if birthday is today but after 9 AM', () => {
      const timezone = 'America/New_York';
      // 2025-03-20 14:00:00 UTC ==  2025-03-20 10:00:00 'America/New_York'
      const mockedUtcTime = moment.utc('2025-03-20 14:00:00', 'YYYY-MM-DD HH:mm:ss');
      MockDate.set(mockedUtcTime.toDate());

      // Birthday is March 20
      const birthday = new Date('1990-03-20');

      // Expected result: March 20, 2026 at 9:00 AM in the specified timezone
      const expectedDate = moment.tz('2026-03-20 09:00', 'YYYY-MM-DD HH:mm', timezone).toDate();

      const result = service.calculateNextBirthDay(birthday, timezone);

      expect(result.getTime()).toBe(expectedDate.getTime());
    });

    it('should handle leap year birthdays correctly', () => {
      const timezone = 'America/New_York';
      // Mock current date to be 2025-01-15 (non-leap year)
      MockDate.set('2025-01-15');

      // Birthday is February 29 (leap day)
      const birthday = new Date('1996-02-29');

      // In 2025 (non-leap year), the birthday would typically be on February 28 
      // But our function uses MM-DD format, so it will attempt March 1
      const expectedDate = moment.tz('2025-03-01 09:00', 'YYYY-MM-DD HH:mm', timezone).toDate();

      const result = service.calculateNextBirthDay(birthday, timezone);

      expect(result.getTime()).toBe(expectedDate.getTime());
    });

    it('should handle leap year birthdays correctly in a leap year', () => {
      const timezone = 'America/New_York';
      // Mock current date to be 2024-01-15 (leap year)
      MockDate.set('2024-01-15');

      // Birthday is February 29 (leap day)
      const birthday = new Date('1996-02-29');

      // In 2024 (leap year), the birthday would be on February 29
      const expectedDate = moment.tz('2024-02-29 09:00', 'YYYY-MM-DD HH:mm', timezone).toDate();

      const result = service.calculateNextBirthDay(birthday, timezone);

      expect(result.getTime()).toBe(expectedDate.getTime());
    });

    it('should work with different timezones', () => {
      // Mock current date 
      MockDate.set('2025-01-15');

      const birthday = new Date('1990-03-20');

      // Testing with Tokyo timezone
      const tokyoTimezone = 'Asia/Tokyo';
      const expectedDateTokyo = moment.tz('2025-03-20 09:00', 'YYYY-MM-DD HH:mm', tokyoTimezone).toDate();

      const resultTokyo = service.calculateNextBirthDay(birthday, tokyoTimezone);

      expect(resultTokyo.getTime()).toBe(expectedDateTokyo.getTime());
    });
  });
});