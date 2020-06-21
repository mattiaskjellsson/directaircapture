import React, { Component } from 'react';
import Axios from 'axios';
import BarComponent from './BarComponent';
import EditBarComponent from './EditBarComponent';

export default class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = this.getInitialState();
    this.add = this.add.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSlideAdd = this.handleSlideAdd.bind(this);
    this.convertTonnageToId = this.convertTonnageToId.bind(this);
    this.gotoOrder = this.gotoOrder.bind(this);
    this.updateBasket = this.updateBasket.bind(this);
  }

  getInitialState() {
    return {
      orderValue: 0,
      orderEnabled: true,
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  add(event) {
    const url=`https://www.directaircaptures.se/?add-to-cart=${event}`
    Axios.get(url)
    .then(res => {
      this.setState({orderEnabled: true});
      console.log(res);
    })
  }

  contactUs() {
    window.location.assign("mailto:contact@nordicdacgroup.com");
  }

  handleClick(event) {
    this.setState({orderEnabled: false});
    this.add(this.convertTonnageToId(event));
  }

  handleSlideAdd(event) {
    this.setState({orderEnabled: false});
    this.add(this.convertSliderTonnageToId(event));
  }

  //
  // take a tonnage and convert it to the store's product Id.
  convertTonnageToId(tonnage) {
    this.updateBasket(tonnage);
    switch (tonnage) {
      case 20:
        return 30;
      case 50:
        return 228;
      case 80:
        return 229;
      case 100:
        return 230;
      default:
        return 30;
    }
  }

  convertSliderTonnageToId(tonnage) {
    this.updateBasket(tonnage);
    return tonnage+664;
  }

  updateBasket(tonnage) {
    const dollarPerTonCo2 = 350.0;

    const newOrderValue = (+tonnage) * (dollarPerTonCo2) + (+this.state.orderValue);
    this.setState({orderValue: newOrderValue });
  }

  gotoOrder() {
    window.location.assign("https://www.directaircaptures.se/basket/");
  }

  render() {
    return (
      <div>
        <div className="bar-container">
          <BarComponent
            tonnage="20"
            clickHandler={this.handleClick}
            color="#86c25e"
          ></BarComponent>
          <BarComponent
            tonnage="50"
            clickHandler={this.handleClick}
            color="#5fba5d"
          ></BarComponent>
          <BarComponent
            tonnage="80"
            clickHandler={this.handleClick}
            color="#59a855"
          ></BarComponent>
          <BarComponent
            tonnage="100"
            clickHandler={this.handleClick}
            color="#329650"
          ></BarComponent>
          <EditBarComponent
            tonnage="9999"
            clickHandler={this.handleSlideAdd}
            color="#736B21"
          ></EditBarComponent>
          
          <div className="column">
            <div className="bar-container contact-us bg-blue"></div>
            <div className="amount-container blue">+9999 tonnes</div>
            <div className="avoided-container">AVOIDED<br />CO<sub>2</sub> EMISSION</div>
            <div className="button-container"><button className="button bg-blue" onClick={() => this.contactUs()}>Contact us</button></div>
          </div>
        </div>
        <div className="basket-container">
          <div className="column">
            <img className="klarna-image" src="https://usercontent.one/wp/www.directaircaptures.se/wp-content/uploads/2020/06/klarna.jpg"></img>
          </div>
          <div className="column comitment">
            Select your negative emissions commitment.
          </div>
          <div className="column total">
            <div className="top">
              SUB TOTAL
            </div>
            <div className="bottom">
              { this.state.orderValue }$
            </div>
          </div>
          <div className="column">
            <button enabled={ this.state.orderEnabled } class="button" onClick={() => this.gotoOrder() }>ORDER</button>
          </div>
        </div>
      </div>
    );
  }
};
