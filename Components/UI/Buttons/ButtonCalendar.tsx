import classes from "./ButtonCalendar.module.css";
import Link from "next/link";
import Image from 'next/image'
import { useScrollChecker } from "../../../hooks/useScrollChecker";
import { ButtonCallendarType } from "../../../Types/types";
export const ButtonCalendar:React.FC<ButtonCallendarType> = (props ): JSX.Element => {
  const pageY = useScrollChecker();
  return (
    <Link className={pageY <= 1 ? `${props.black ? classes.nav__callendar__black : classes.nav__callendar}` : `${classes.nav__callendar} ${classes.nav__callendar__scrolled}`} href={props.path}>
      <Image 
                className={classes.background__image} 
                src={'/static/images/callendar.png'} 
                alt={'Ikona Kalendarza'}
                quality={50}
                width={20}
                height={20}
                style={{
                marginRight:"10px",
                objectFit: 'cover',
                }} 
            />
      {props.text}
    </Link>
  );
};
 