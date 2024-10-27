import { Controller, Get, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('by-date')
  listByDate(@Query('selectedDate') selectedDate: string) {
    return this.appointmentsService.listByDate(selectedDate);
  }
}
