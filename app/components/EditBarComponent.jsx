import React from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

export default class BarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.initialState();
  }

  initialState() {
    return {
      tonnage: this.props.tonnage,
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.props.clickHandler(this.state.tonnage);
  }

  handleChange(e) {
    this.setState({ tonnage: e});
  }
  
  render() {
    const height = Math.round((this.state.tonnage/9999.0)*350.0);
    let bar = {
      'height': `${height}px`,
      'backgroundColor': `${this.props.color}`,
    }

    let backgroundColor = {
      'background': this.props.color,
    }

    let color = {
      'color': this.props.color,
    }

    return (
      <div className="column">
        <div className="bar-container variable" style={bar}>
          <ReactSlider
            className="vertical-slider"
            thumbClassName="thumb"
            trackClassName="track"
            defaultValue={this.state.tonnage}
            ariaLabel={'t'}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            orientation="vertical"
            invert
            max="9999"
            min="1"
            onChange={ this.handleChange }
          />
        </div>
        <div className="amount-container" style={color}>{ this.state.tonnage } tonnes</div>
        <div className="avoided-container">AVOIDED<br />CO<sub>2</sub> EMISSION</div>
        <div className="button-container">
        <button className="button" onClick={this.handleClick} style={backgroundColor}>Add to chart</button>
        </div>
      </div>
    );
  }
}

BarComponent.props = {
  tonnage: 0,
  color: "#777777",
}
