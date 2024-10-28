import { BadRequestException, Injectable } from '@nestjs/common';
import { Appointment } from './appointment.model';
import * as dayjs from 'dayjs';

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[] = [
    {
      id: '1234',
      startDate: dayjs().subtract(1, 'hour').minute(0).second(0).toDate(),
      duration: 60,
      patientName: 'Alice',
      description: 'check-up',
    },
    {
      id: '1235',
      startDate: dayjs().subtract(2, 'hours').minute(30).second(0).toDate(),
      duration: 30,
      patientName: 'Bob',
      description: 'vaccination',
    },
    {
      id: '1236',
      startDate: dayjs().minute(0).second(0).toDate(),
      duration: 30,
      patientName: 'Sue',
      description: 'Blood test',
    },
    {
      id: '1236',
      startDate: dayjs().subtract(3, 'hours').minute(30).second(0).toDate(),
      duration: 30,
      patientName: 'Sue',
      description: 'Blood test',
    },
    {
      id: '1237',
      startDate: dayjs().add(4, 'hours').minute(0).second(0).toDate(),
      duration: 60,
      patientName: 'Emily',
      description: 'Consultation',
    },
    {
      id: '1238',
      startDate: dayjs().add(5, 'hours').minute(30).second(0).toDate(),
      duration: 30,
      patientName: 'Robert',
      description: 'Consultation',
    },
    {
      id: '1239',
      startDate: dayjs().add(6, 'hours').minute(0).second(0).toDate(),
      duration: 60,
      patientName: 'Linda',
      description: 'Test',
    },
    {
      description: 'Current appointment',
      patientName: 'Test',
      duration: 30,
      startDate: dayjs().set('minute', 0).toDate(),
      id: '5678',
    },
  ];

  listByDate(selectedDate: string): Appointment[] {
    return this.appointments.filter((item) =>
      dayjs(item.startDate).isSame(dayjs(selectedDate), 'day'),
    );
  }

  schedule(newAppointment: Appointment): Appointment {
    const startTime = dayjs(newAppointment.startDate);
    const endTime = startTime.add(newAppointment.duration, 'minute');

    if (startTime.minute() !== 0 && startTime.minute() !== 30) {
      throw new BadRequestException(
        'Appointment must start at full or half hour.',
      );
    }

    if (!startTime.isSame(endTime, 'day')) {
      throw new BadRequestException('Appointment must end on the same day.');
    }

    for (const item of this.appointments) {
      const appStart = dayjs(item.startDate);
      const appEnd = appStart.add(item.duration, 'minute');

      if (
        ((startTime.isSame(appStart) || startTime.isAfter(appStart)) &&
          startTime.isBefore(appEnd)) ||
        (endTime.isAfter(appStart) &&
          (endTime.isSame(appEnd) || endTime.isBefore(appEnd)))
      ) {
        throw new BadRequestException(
          'Appointment overlaps with an existing appointment.',
        );
      }
    }

    this.appointments.push(newAppointment);
    return newAppointment;
  }

  cancel(id: string): void {
    const index = this.appointments.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new BadRequestException('Appointment not found.');
    }
    this.appointments.splice(index, 1);
  }
}
