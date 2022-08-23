import React from 'react';
import style from './ModalWindow.module.css';

type ModalWindowProps = {
  active: boolean;
  setActive: React.Dispatch<boolean>;
  children: JSX.Element | string;
};

export default class ModalWindow extends React.Component<ModalWindowProps> {
  constructor(props: ModalWindowProps) {
    super(props);
  }
  render() {
    return (
      <div
        className={this.props.active ? `${style.modal} ${style.active}` : style.modal}
        onClick={() => this.props.setActive(false)}
      >
        <div
          className={this.props.active ? `${style.modal__window} ${style.active}` : style.modal__window}
          onClick={(e) => e.stopPropagation()}
        >
          <p className={style.window__text}>{this.props.children}</p>
        </div>
      </div>
    );
  }
}
