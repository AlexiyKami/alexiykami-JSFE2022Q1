import style from './Footer.module.css';

export default function Footer(): JSX.Element {
  return (
    <footer className={style.footerWrapper}>
      <a className={style.footerWrapper__link} href="https://github.com/AlexiyKami" target="_blank">
        Github
      </a>
      <a className={style.footerWrapper__link} href="https://rs.school/" target="_blank">
        RSSchool
      </a>
    </footer>
  );
}
