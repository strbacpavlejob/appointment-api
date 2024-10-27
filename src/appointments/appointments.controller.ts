import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.model';
import { v4 as uuid } from 'uuid';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('by-date')
  listByDate(@Query('selectedDate') selectedDate: string) {
    return this.appointmentsService.listByDate(selectedDate);
  }

  @Post('schedule')
  schedule(@Body() body: Omit<Appointment, 'id'>) {
    const newAppointment: Appointment = { ...body, id: uuid() };
    return this.appointmentsService.schedule(newAppointment);
  }

  @Delete('cancel/:id')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(id);
  }
}
