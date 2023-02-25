import classes from "./HeaderMobile.module.css";
import { Fragment, useContext } from "react";
import { NavMobile } from "../Nav/NavMobile";
import { UIContext } from "../../Store/UI-context";
import { Logo } from "./Logo";
import { blackNav } from "../../Types/types";
import { useScrollChecker } from "../../hooks/useScrollChecker";
export const HeaderMobile:React.FC<{black:blackNav}> = (props): JSX.Element => {
  const pageY = useScrollChecker();
  const { drop, dropDownNav } = useContext(UIContext);
  const burgerClickHandler = () => {drop ? dropDownNav(false) : dropDownNav(true);};
  return (
    <Fragment>
      <header
        className={
          drop ? (pageY <= 1 ? classes.header : `${classes.header} ${classes.header__scrolled}`) : `${classes.header} ${classes.header__active}`
        }
      >
        <Logo black={props.black} />
        <div className={!props.black ? classes.wrapper__burger : `${classes.wrapper__burger} ${classes.wrapper__burger__black}`} onClick={burgerClickHandler}>
          <span
            className={drop ? classes.burger: `${classes.burger} ${`${props.black ? `${classes.burger__active} ${classes.burger__active__black}` :classes.burger__active} `}`}
          ></span>
        </div>
      </header>
      {<NavMobile black={props.black} drops={drop} />}
    </Fragment>
  );
};
