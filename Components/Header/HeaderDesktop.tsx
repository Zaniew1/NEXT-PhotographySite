import { NavDesktop } from "../Nav/NavDesktop";
import { ButtonCalendar } from "../UI/ButtonCalendar";
import { Logo } from "./Logo";
import { useScrollChecker } from "../../hooks/useScrollChecker";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";


import classes from "./HeaderDesktop.module.css";
export const HeaderDesktop: React.FC = (props) => {
  const pageY = useScrollChecker();
  return (
    <header
      className={
        pageY <= 1
          ? classes.header
          : `${classes.header} ${classes.header__scrolled}`
      }
    >
      <div className={classes.header__wrapper}>
        {pageY <= 1 ? <Logo black={props.black} /> : ""}
        <NavDesktop />
      </div>
      <div className={classes.button__wrapper}>
        <ButtonCalendar text="Sprawdź datę" fontAwesome={faCalendar} path="/contact"/>
      </div>
    </header>
  );
};
