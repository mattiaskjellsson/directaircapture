import React from 'react';

export default class BarComponent extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(event) {
        event.preventDefault();
        this.props.clickHandler(this.props.tonnage);
    }
    render() {
        let bar = {
          'height': `${(+this.props.tonnage)+Math.log10(+this.props.tonnage)}px`,
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
          <div className="bar-container" style={bar}></div>
          <div className="amount-container" style={color}>{ this.props.tonnage} tonnes</div>
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
