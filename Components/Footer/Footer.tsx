import classes from "./Footer.module.css";
import Link from "next/link";
import { ButtonCalendar } from "../UI/Buttons/ButtonCalendar";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
export const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__wrapper}>
        <div className={classes.footer__description}>
          <p>jestem artystką, która tworzy piekne i romantyczne portrety!</p>
        </div>
        <div className={classes.footer__pictures}>
          <p className={classes.footer__header}>Portfolio</p>
          <Link href="/gallery" className={classes.footer__link}>
            Galeria
          </Link>
        </div>
        <div className={classes.footer__nav}>
          <div className={classes.footer__about}>
            <p className={classes.footer__header}>O Mnie</p>
            <ul>
              <li className={classes.footer__link}>
                <Link href="/opinion">Opinie</Link>
              </li>
              <li className={classes.footer__link}>
                <Link href="/about">O Mnie</Link>
              </li>
              <li className={classes.footer__link}>
                <Link href="/offert">Oferta</Link>
              </li>
              <li className={classes.footer__link}>
                <Link href="/contact">Kontakt</Link>
              </li>
            </ul>
          </div>
          <div className={classes.footer__contact}>
            <p className={classes.footer__header}>Kontakt</p>
            <div className={classes.footer__link}>Kamila.Koziara@gmail.com</div>
            <div className={classes.footer__link}>
              <a href="tel:+48502232699">+48 502 232 699</a>
            </div>
            <div className={classes.footer__icons__wrap}>
              <Link href="https://facebook.com" className={classes.footer__icons}/>
              <Link href="https://instagram.com" className={classes.footer__icons}/>
            </div>
          </div>
        </div>
        <div className={classes.footer__check}>
          <ButtonCalendar black={true} text="Sprawdź Datę" fontAwesome={faCalendar} path="/contact"/>
        </div>
        <div className={classes.footer__copyright}>
          © 2022. Kamila Koziara - Fotograf ślubny
        </div>
      </div>
    </footer>
  );
};
