import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../modules/health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should return health status', () => {
      // Act
      const result = controller.check();

      // Assert
      expect(result).toEqual({ status: 'ok' });
    });
  });
});
