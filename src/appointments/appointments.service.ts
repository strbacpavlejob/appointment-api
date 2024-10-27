import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.model';
import * as dayjs from 'dayjs';

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[] = [
    {
      id: '1234',
      startDate: new Date('2024-10-28T09:00:00'),
      duration: 60,
      patientName: 'Alice',
      description: 'check-up',
    },
    {
      id: '1235',
      startDate: new Date('2024-10-28T10:30:00'),
      duration: 30,
      patientName: 'Bob',
      description: 'vaccination',
    },
    {
      id: '1236',
      startDate: new Date('2024-10-28T11:00:00'),
      duration: 45,
      patientName: 'Sue',
      description: 'Blood test',
    },
    {
      id: '1237',
      startDate: new Date('2024-10-28T13:00:00'),
      duration: 60,
      patientName: 'Emily',
      description: 'Consultation',
    },
    {
      id: '1238',
      startDate: new Date('2024-10-28T14:30:00'),
      duration: 30,
      patientName: 'Robert',
      description: 'Consultation',
    },
    {
      id: '1239',
      startDate: new Date('2024-10-28T15:00:00'),
      duration: 60,
      patientName: 'Linda',
      description: 'Test',
    },
  ];

  listByDate(selectedDate: string): Appointment[] {
    return this.appointments.filter((app) =>
      dayjs(app.startDate).isSame(dayjs(selectedDate), 'day'),
    );
  }
}
