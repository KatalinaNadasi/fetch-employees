import React from 'react';
import axios from 'axios';

import DisplayEmployee from './components/DisplayEmployee';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const sampleEmployee = {
  gender: 'male',
  name: {
    first: 'Charlie',
    last: 'Thompson',
  },
  location: {
    street: {
      number: 761,
      name: 'Tay Street',
    },
    city: 'Timaru',
    postcode: 76111,
  },
  email: 'charlie.thompson@example.com',
  picture: {
    medium: 'https://randomuser.me/api/portraits/med/men/2.jpg',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: sampleEmployee,
      loading: false,
    };

    this.getEmployee = this.getEmployee.bind(this);
  }

  getEmployee() {
    this.setState({ loading: true }, () => {
      axios.get('https://randomuser.me/api?nat=fr')
      .then(response => response.data)
      .then(data => {
        this.setState({
          employee: data.results[0],
          loading: false,
        })
      })
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.loading
            ? <LoadingSpinner />
          : (
            <>
              <DisplayEmployee employee={this.state.employee} />
              <button type='button' onClick={this.getEmployee}>Get employee</button>
            </>
          )
        }
      </div>
    );
  }
}

export default App;
