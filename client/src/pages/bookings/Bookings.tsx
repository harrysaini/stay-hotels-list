import React from 'react';
import './Bookings.css';
import HotelService from '../../services/hotel.service';
import { withRouter, RouteComponentProps, match } from 'react-router';
import ImageCarousel from '../../_shared-components/ImageCarousel';


interface State {
  loading: boolean;
  bookings?: any[];
}
interface Props {

}

const keys = ['id', "hotel", "city", "customer_name", "customer_email", "customer_phone", "date_booked", "slot"];

class Bookings extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true
    }
  }




  componentDidMount = async () => {
    console.log(this.props);
    const bookings = await HotelService.getBookings();

    this.setState({
      bookings: bookings,
      loading: false
    });
  }





  render() {

    if (this.state.loading) {
      return (
        <div className="details">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }

    const header = keys.map((key, index) => {
      return (<th scope="col" key={index}>{key}</th>)
    });

    const bookings = this.state.bookings && this.state.bookings.map((booking, index) => {

      const rows = keys.map((key, index) => {
        return (
          <td key={index}>{booking[key]}</td>
        )
      })

      return (
        <tr key={index}>
          {rows}
        </tr>
      )
    });


    return (
    <div>
      <h1>Bookings</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>
          {bookings}
        </tbody>
      </table>
    </div>
  );
  }

}

export default Bookings;
