import classes from "./HeaderMobile.module.css";
import { Fragment, useEffect, useState, useContext } from "react";
import { NavMobile } from "../Nav/NavMobile";
import { NavDesktop } from "../Nav/NavDesktop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { UIContext } from "../../Store/UI-context";
import { Logo } from "./Logo";
import { blackNav } from "../../Types/types";
import { useScrollChecker } from "../../hooks/useScrollChecker";
export const HeaderMobile = (props:{black:blackNav}): JSX.Element => {
  const pageY = useScrollChecker();
  const { drop, dropDownNav } = useContext(UIContext);
  const burgerClickHandler = (event: React.MouseEvent) => {
    drop ? dropDownNav(false) : dropDownNav(true);
  };
  return (
    <Fragment>
      <header
        className={
          drop ? (pageY <= 1 ? classes.header : `${classes.header} ${classes.header__scrolled}`) : `${classes.header} ${classes.header__active}`
        }
      >
        <Logo black={props.black} />
        <div className={classes.wrapper__burger} onClick={burgerClickHandler}>
          <span
            className={
              drop
                ? classes.burger
                : `${classes.burger} ${classes.burger__active}`
            }
          ></span>
        </div>
      </header>
      {<NavMobile black={props.black} drops={drop} />}
    </Fragment>
  );
};
