import React, { Component } from 'react';
import Axios from 'axios';
import BarComponent from './BarComponent';
import EditBarComponent from './EditBarComponent';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSlideAdd = this.handleSlideAdd.bind(this);
    this.convertTonnageToId = this.convertTonnageToId.bind(this);
  }

  getInitialState() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  add(event) {
    const url=`https://www.directaircaptures.se/?add-to-cart=${event}`
    Axios.get(url)
    .then(res => {
      console.log(res);
    })
  }

  contactUs() {
    window.location.assign("mailto:contact@nordicdacgroup.com");
  }

  handleClick(event) {
    this.add(this.convertTonnageToId(event));
  }

  handleSlideAdd(event) {
    this.add(this.convertSliderTonnageToId(event));
  }

  //
  // take a tonnage and convert it to the store's product Id.
  convertTonnageToId(tonnage) {
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
    return tonnage+664;
  }

  render() {
    return (
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
    );
  }
};
