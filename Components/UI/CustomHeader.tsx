import { classicNameResolver } from "typescript"
import classes from './CustomHeader.module.css';
type CustomHeaderType = {
        customClass:string | null,
        text: string
}
export const CustomHeader = (props:CustomHeaderType)=>{
    return(
            <h2 className={`${classes.custom__header} ${props.customClass}`}>{props.text}</h2>
    )
}