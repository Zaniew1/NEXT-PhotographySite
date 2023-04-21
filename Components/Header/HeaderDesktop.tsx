import { NavDesktop } from "../Nav/NavDesktop";
import { Logo } from "./Logo";
import Link from "next/link";

import { useScrollChecker } from "../../hooks/useScrollChecker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
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
      <div className={classes.header__button__wrapper}>
        <Link className={pageY <= 1 ? `${props.black ? classes.header__callendar__black : classes.header__callendar}` : `${classes.header__callendar} ${classes.header__callendar__scrolled}`} href={"/contact"}>
              <div className={classes.header__callendar__icon__wrapper} >
                <FontAwesomeIcon className={`${!props.black ? classes.callendar__icon : classes.callendar__icon__black}`}  icon={faCalendarDays} />
              </div>
        {"Sprawdź datę"}
      </Link>
        
      </div>
    </header>
  );
};
