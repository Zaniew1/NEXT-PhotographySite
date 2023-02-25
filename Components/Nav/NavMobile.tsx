import classes from "./NavMobile.module.css";
import { navigation, navigationPictures } from "../../Data/Data";
import { BooleanElementType } from "../../Types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import { ButtonCalendar } from "../UI/ButtonCalendar";
import { NavigationLinks } from "../UI/NavigationLinks";
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
        <div className={classes.socials__icons}>
          <FontAwesomeIcon icon={faFaceAngry} />
        </div>
        <div className={classes.socials__icons}>
          <FontAwesomeIcon icon={faFaceAngry} />
        </div>
      </div>
    </nav>
  );
};
