import React from 'react';

import { bind } from 'lodash/function'

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startingX: 0, startingY: 0, x: 0, y: 0, dragging: false };
    this.startDragging = bind(this.startDragging, this);
    this.stopDragging = bind(this.stopDragging, this);
    this.dragging = bind(this.dragging, this);
  }

  startDragging(e) {
    this.setState({
      dragging: true,
      startingX: e.pageX,
      startingY: e.pageY,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  stopDragging(e) {
    this.setState({dragging: false});
  }

  dragging(e) {
    if (this.state.dragging) {
      this.setState({
        x: this.state.x + e.pageX - this.state.startingX,
        y: this.state.y + e.pageY - this.state.startingY,
        startingX: e.pageX,
        startingY: e.pageY
      });
    }
  }

  render() {
    const { x, y } = this.state;

    return (
      <div style={{position: 'relative', left: x, top: y}}
        onMouseDown={this.startDragging}
        onMouseUp={this.stopDragging}
        onMouseMove={this.dragging}
      >{this.props.children}</div>
    );
  }
}

export default Draggable;
