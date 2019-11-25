import { IBookingRequest } from "./bookOptions";
import _ from "lodash";
import BookingDAO from "../../dao/booking.dao";


class BookingModel {

  static async create(options: IBookingRequest) {
    const booking = await BookingDAO.createBooking(options);
    return booking;
  }

  static async getAll() {
    const bookings = await BookingDAO.getAllBooking();
    return bookings;
  }

}

export default BookingModel;
