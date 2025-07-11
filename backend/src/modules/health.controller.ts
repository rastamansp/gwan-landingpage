import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verificar saúde da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação funcionando normalmente',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok',
        },
      },
    },
  })
  check() {
    return { status: 'ok' };
  }
}
