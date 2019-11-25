import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';

class Booking extends Model {

}
Booking.init({
  hotel: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING
  },
  customer_name: {
    type: Sequelize.STRING
  },
  customer_email: {
    type: Sequelize.STRING
  },
  customer_phone: {
    type: Sequelize.STRING
  },
  date_booked: {
    type: Sequelize.DATE
  },
  slot: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'booking'
});

export default Booking;
