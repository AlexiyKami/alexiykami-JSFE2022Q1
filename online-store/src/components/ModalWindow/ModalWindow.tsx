import React from 'react';
import style from './ModalWindow.module.css';

export default class ModalWindow extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div
        className={this.props.active ? style.modal + ' ' + style.active : style.modal}
        onClick={() => this.props.setActive(false)}
      >
        <div
          className={this.props.active ? style.modal__window + ' ' + style.active : style.modal__window}
          onClick={(e) => e.stopPropagation()}
        >
          <p className={style.window__text}>{this.props.children}</p>
        </div>
      </div>
    );
  }
}
