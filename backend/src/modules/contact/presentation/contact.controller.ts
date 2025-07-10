import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('contact')
export class ContactController {
    @Get()
    getHealth() {
        return {
            message: 'Contact API is working!',
            timestamp: new Date().toISOString(),
        };
    }

    @Post()
    async createContact(@Body() contactData: any) {
        // TODO: Implementar lógica de envio de email
        return {
            success: true,
            message: 'Mensagem recebida com sucesso!',
            data: contactData,
        };
    }
} 