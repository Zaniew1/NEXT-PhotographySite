import { NavDesktop } from "../Nav/NavDesktop";
import { ButtonCalendar } from "../UI/ButtonCalendar";
import { Logo } from "./Logo";
import { useScrollChecker } from "../../hooks/useScrollChecker";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { blackNav } from "../../Types/types";
import classes from "./HeaderDesktop.module.css";
export const HeaderDesktop:React.FC<{black: blackNav}> = (props):JSX.Element => {
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
        <NavDesktop black={props.black} />
      </div>
      <div className={classes.button__wrapper}>
        <ButtonCalendar black={props.black} text="Sprawdź datę" fontAwesome={faCalendar} path="/contact"/>
      </div>
    </header>
  );
};
