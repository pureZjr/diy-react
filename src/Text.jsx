import React from '../core/index';

export default class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  onHandleClick = () => {
    this.setState({
      text: this.props.text + 'text is change',
    });
  };

  render() {
    return (
      <div>
        <div onClick={this.onHandleClick}>change text</div>
        {this.state.text}
      </div>
    );
  }
}
