import classes from "./Footer.module.css";
import Link from "next/link";
import { Button } from "../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export const Footer: React.FC = (props) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__wrapper}>
        <div className={classes.footer__description}>
          <h2>jestem artystką, która tworzy piekne i romantyczne portrety!</h2>
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
              <div className={classes.footer__icons}>
                <FontAwesomeIcon icon={faFaceAngry} />
              </div>
              <div className={classes.footer__icons}>
                <FontAwesomeIcon icon={faFaceAngry} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer__check}>
          <Button text="Sprawdź Datę" fontAwesome={faCalendar} path="/contact"/>
        </div>
        <div className={classes.footer__copyright}>
          © 2022. Kamila Koziara - Fotograf ślubny
        </div>
      </div>
    </footer>
  );
};
