import style from './ModalWindow.module.css';

export default function ModalWindow(props: any) {
  return (
    <div
      className={props.active ? style.modal + ' ' + style.active : style.modal}
      onClick={() => props.setActive(false)}
    >
      <div
        className={props.active ? style.modal__window + ' ' + style.active : style.modal__window}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={style.window__text}>{props.children}</p>
      </div>
    </div>
  );
}
