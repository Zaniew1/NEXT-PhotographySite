import classes from "./ButtonCalendar.module.css";
import Link from "next/link";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useScrollChecker } from "../../hooks/useScrollChecker";
import { ButtonCallendarType } from "../../Types/types";
export const ButtonCalendar:React.FC<ButtonCallendarType> = (props ): JSX.Element => {
  const pageY = useScrollChecker();
  return (
    <Link className={pageY <= 1 ? `${props.black ? classes.nav__callendar__black : classes.nav__callendar}` : `${classes.nav__callendar} ${classes.nav__callendar__scrolled}`} href={props.path}>
      {props.fontAwesome && <FontAwesomeIcon className={classes.callendar__icon} icon={props.fontAwesome} />}
      {props.text}
    </Link>
  );
};
 