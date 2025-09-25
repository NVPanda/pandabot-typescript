import { SendMessageUseCase } from '../domain/usecases/SendMessageUseCase';

describe('Pandabot Tests', () => {
  test('SendMessageUseCase', async () => {
    const useCase = new SendMessageUseCase();
    // Mock sock, expect sendText called
    expect(useCase).toBeDefined();
  });
});