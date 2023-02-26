import classes from "./Button.module.css";
import Link from "next/link";
import {ButtonType} from '../../../Types/types'
export const Button:React.FC<ButtonType> = (props ): JSX.Element => {
  return (
    <Link className={props.className ? props.className : classes.button} href={props.path}>
      {props.text}
    </Link>
  );
};
