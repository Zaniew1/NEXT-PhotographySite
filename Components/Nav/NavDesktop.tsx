import classes from "./NavDesktop.module.css";
import { navigation, navigationPictures } from "../../Data/Data";
import { NavigationLinks } from "../UI/Navigation/NavigationLinks";
import { useScrollChecker } from "../../hooks/useScrollChecker";
import { blackNav } from "../../Types/types";
import Link from "next/link";
export const NavDesktop:React.FC<{black:blackNav}> = (props):JSX.Element => {
  const pageY = useScrollChecker();
  return (
    <nav
      className={
        pageY <= 1 ? `${props.black ? classes.nav__black : classes.nav}` : `${classes.nav} ${classes.nav__scrolled}`
      }
    >
      <div
        className={
          pageY <= 1
            ? classes.nav__initials
            : `${classes.nav__initials} ${classes.nav__initials__scrolled}`
        }
      >
        <Link href="/">
        K&K
        </Link>
      </div>
      <div className={classes.nav__navigation}>
        <div className={classes.nav__wrapper}>
          <ul className={classes.nav__wrapper}>
            {navigationPictures.map((el) => {
              return (
                <NavigationLinks
                  key={Math.random()}
                  text={el.text}
                  classLi={classes.nav__li}
                  classLink={classes.nav__link}
                  classLinkActive={classes.nav__link__active}
                  path={el.path}
                />
              );
            })}
          </ul>
        </div>

        <ul className={classes.nav__wrapper}>
          {navigation.map((el) => {
            return (
              <NavigationLinks
                key={Math.random()}
                text={el.text}
                path={el.path}
                classLi={classes.nav__li}
                classLink={classes.nav__link}
                classLinkActive={classes.nav__link__active}
              />
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
