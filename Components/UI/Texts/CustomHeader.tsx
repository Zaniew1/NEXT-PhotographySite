import classes from './CustomHeader.module.css';
import { CustomHeaderType } from "../../../Types/types";
export const CustomHeader:React.FC<CustomHeaderType> = (props):JSX.Element=>{
    return(
            <h2 className={`${classes.custom__header} ${props.customClass}`}>{props.text}</h2>
    )
}