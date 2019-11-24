import React from 'react';
import './Listing.css';
import AppliedFilters from './components/AppliedFilters';
import Filters from './components/Filters';
import HotelsList from './components/HotelsList';
import HotelService from '../../services/hotel.service';

interface State {
  hotels: any[];
  loading: boolean;
}

interface Props {
}

class Listing extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      hotels: [],
      loading: true
    }
  }

  componentDidMount = async () => {
    const hotelsList = await HotelService.fetchHotels();

    this.setState({
      hotels: hotelsList,
      loading: false
    });
  }


  render() {

    return (
        <div className="row">
          <div className="col-md-3 d-none d-sm-none d-md-block">
            <Filters />
          </div>
          <div className="col-12 col-md-9">
            <div>
              <AppliedFilters />
            </div>
            <div className="mt-4 hotels-list">
              <HotelsList hotels={this.state.hotels} loading={this.state.loading}/>
            </div>
          </div>
        </div>
    );
  }

}

export default Listing;
