import { Request } from 'express';

export interface IBookingRequest {
  hotel: string;
  city: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  date_booked: string;
  slot: string;
}

export class BookingRequest implements IBookingRequest {
  hotel: string;
  city: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  date_booked: string;
  slot: string;

  constructor(req: Request) {
    this.hotel = req.body.hotel;
    this.city = req.body.city;
    this.customer_email = req.body.email;
    this.customer_name = req.body.name;
    this.customer_phone = req.body.phone;
    this.date_booked = req.body.date;
    this.slot = req.body.slot;

    if(!this.hotel) {
      throw new Error('hotel name not present');
    }
    if(!this.city) {
      throw new Error('city name not present');
    }
    if(!this.customer_email) {
      throw new Error('customer email not present');
    }
    if(!this.customer_name) {
      throw new Error('customer name not present');
    }
    if(!this.customer_phone) {
      throw new Error('customer phone not present');
    }
    if(!this.date_booked) {
      throw new Error('date not present');
    }
    if(!this.slot) {
      throw new Error('slot not present');
    }

  }
}
