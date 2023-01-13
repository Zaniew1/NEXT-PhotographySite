import classes from "./Button.module.css";
import Link from "next/link";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export const Button = (props: {text: string, className:string, path: string}): JSX.Element => {
  return (
    <Link className={props.className ? props.className : classes.button} href={props.path}>
      {props.text}
    </Link>
  );
};
