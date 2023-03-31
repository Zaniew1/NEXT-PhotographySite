import classes from "./NavMobile.module.css";
import { navigation, navigationPictures } from "../../Data/Data";
import { BooleanElementType } from "../../Types/types";
import { ButtonCalendar } from "../UI/Buttons/ButtonCalendar";
import Link from "next/link";
import { NavigationLinks } from "../UI/Navigation/NavigationLinks";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
export const NavMobile: React.FC<BooleanElementType> = (props): JSX.Element => {
  return (
    <nav
    
      className={
        props.drops ? classes.nav : `${classes.nav} ${classes.nav__active}`
      }
    >
      <div className={classes.nav__pictures}>
        <ul>
          {navigationPictures.map((el) => {
            return (
              <NavigationLinks
                key={Math.random()}
                text={el.text}
                classLi={classes.pictures__list}
                classLink={classes.pictures__items}
                classLinkActive={classes.pictures__items__active}
                path={el.path}
              />
            );
          })}
        </ul>
      </div>
      <div className={classes.nav__links}>
        <ul>
          {navigation.map((el) => {
            return (
              <NavigationLinks
                key={Math.random()}
                text={el.text}
                classLi={classes.nav__items}
                classLink={classes.nav__link}
                classLinkActive={classes.nav__link__active}
                path={el.path}
              />
            );
          })}
        </ul>
      </div>
      <div className={classes.nav__date}>
        <ButtonCalendar black={true} text="Sprawdź datę" fontAwesome={faCalendar} path="/contact"/>
      </div>
      <div className={classes.nav__socials}>
      <Link href="https://facebook.com" className={classes.socials__icons}/>
      <Link href="https://instagram.com" className={classes.socials__icons}/>
      </div>
    </nav>
  );
};
