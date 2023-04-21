import classes from "./ButtonCalendar.module.css";
import Link from "next/link";
import { ButtonCallendarType } from "../../../Types/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
export const ButtonCalendar:React.FC<ButtonCallendarType> = (props ): JSX.Element => {

  return (
    <Link className={`${props.black ? classes.nav__callendar__black : classes.nav__callendar}`} href={props.path}>
            <div className={classes.button__callendar__icon__wrapper} >
              <FontAwesomeIcon className={`${!props.black ? classes.callendar__icon : classes.callendar__icon__black}`}  icon={faCalendarDays} />
            </div>
      {props.text}
    </Link>
  );
};
 