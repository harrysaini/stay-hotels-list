import React from 'react';
import './Details.css';
import HotelService from '../../services/hotel.service';
import { withRouter, RouteComponentProps, match } from 'react-router';
import ImageCarousel from '../../_shared-components/ImageCarousel';

type inputs = 'name' | 'email' | 'phone' | 'date' | 'city' | 'slot';

interface State extends Record<inputs, string> {
  hotel?: any;
  loading: boolean;
  errorMessage: string;
  bookingButtonDisabled: boolean,
  bookingText: string
}

interface Params {
  id: string;
}

interface Props extends RouteComponentProps {
  match: match<Params>
}

class Details extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      bookingButtonDisabled: false,
      bookingText: 'Book Now',
      errorMessage: '',
      loading: true,
      name: '',
      email: '',
      phone: '',
      date: (new Date()).toLocaleDateString(),
      city: '',
      slot: ''
    }
  }

  handleInputChange = (event: React.BaseSyntheticEvent) => {
    const target = event.target;
    const value = target.value as string;
    const name: inputs = target.name as inputs;

    this.setState({
      [name]: value
    } as Record<inputs, string>);
  }

  componentDidMount = async () => {
    console.log(this.props);
    const { id } = this.props.match.params;
    const hotel = await HotelService.getHotel(parseInt(id, 10));

    this.setState({
      hotel: hotel,
      loading: false
    });
  }

  validateFields = () => {
    if(!this.state.name) {
      throw new Error('name empty');
    }
    if(!this.state.email) {
      throw new Error('email empty');
    }
    if(!this.state.phone) {
      throw new Error('phone empty');
    }
    if(!this.state.date) {
      throw new Error('date of entry empty');
    }
    if(!this.state.city) {
      throw new Error('city empty');
    }
    if(!this.state.slot) {
      throw new Error('slot not selected');
    }

  }

  bookHotel = async () => {
    try {
      this.validateFields();
      const dataObj = {
        hotel: this.state.hotel.name,
        city: this.state.city,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        date: this.state.date,
        slot: this.state.slot
      };
      this.setState({
        bookingButtonDisabled: true
      });

      const booking = await HotelService.bookHotel(dataObj);
      alert('Booking done');
      this.setState({
        bookingButtonDisabled: true,
        bookingText: 'Booked'
      });

    } catch(e) {
      this.setState({
        bookingButtonDisabled: false
      });
      this.showErrorMessage(e);
    }
  }

  showErrorMessage = (error: Error) => {
    this.setState({
      errorMessage: error.message
    });
  }


  render() {

    if(this.state.loading) {
      return (
        <div className="details">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }

    const hotel = this.state.hotel;

    const amenities = hotel.amenities && hotel.amenities.map((item: string) => {
      return (
        <li key={item}>{item}</li>
      )
    });

    const slotOptions = hotel.prices && Object.keys(hotel.prices).map((slot) => {
      return (
        <option key={slot}>{slot}</option>
      )
    })

    return (
        <div className="details">
          <div className="images">
            <ImageCarousel images={hotel._pictures || [{url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMxB2BXLzyCSxVh_gpFFxUywbftMCo6IOV-fwulYRyBrlPFSlI'}]}/>
          </div>
          <br/>
          <h2>{hotel.name}</h2>
          <p className="address m-0 p-0">{hotel.locality && hotel.locality.name}</p>

          <br/>
          <div className="ammenties">
            <h3>Amenities</h3>
            <ul>
              {amenities}
            </ul>
          </div>
          <br/>
          <div className="booking">
            <h3>Book Now</h3>
            <div className="forms">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  className="form-input form-control"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  ></input>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="form-input form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  ></input>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  className="form-input form-control"
                  type="number"
                  placeholder="Phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                  ></input>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date of stay</label>
                <input
                  id="date"
                  className="form-input form-control"
                  type="date"
                  placeholder="Date of stay"
                  name="date"
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  ></input>
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  className="form-input form-control"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                  ></input>
              </div>
              <div className="form-group">
                <label htmlFor="slot">Select Slot</label>
                <select
                  className="form-control"
                  id="slot"
                  name="slot"
                  value={this.state.slot}
                  onChange={this.handleInputChange}
                  >
                  <option>Select slot time</option>
                  {slotOptions}
                </select>
              </div>
            </div>

            <br/>
            <hr></hr>
            <h6>Price</h6>
            { (hotel.prices && this.state.slot && hotel.prices[this.state.slot]) ?
              (
                <div>Total Price - <strong>₹{hotel.prices[this.state.slot]}</strong></div>
              ) : (
                <div> select any slot</div>
              )
            }
            <hr></hr>
            <br></br>

            { this.state.errorMessage &&
              <div>
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMessage}
                </div>
              </div>
            }

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={this.bookHotel}
              disabled={this.state.bookingButtonDisabled}
              >{this.state.bookingText}</button>

            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
    );
  }

}

export default withRouter(Details);
