import classes from './UploaderSquare.module.css';
import Link from "next/link";
type UploaderSquareProps = {
    text: string,
    path: string,
}
export  const UploaderSquare = (props: UploaderSquareProps) =>{
   
    return (
        <li className={classes.square__li}>
        <Link
            href={props.path}
            className={classes.square__link}
        >
            {props.text}
        </Link>
        </li>
    )

};