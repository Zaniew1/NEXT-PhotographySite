import { CustomHeader } from "../UI/CustomHeader"
import classes from './OffertPackage.module.css';
import { ButtonCalendar } from "../UI/ButtonCalendar";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { CustomImage } from "../UI/CustomImage";
import { OffertPackageType } from "../../Types/types";
export const OffertPackage:React.FC<OffertPackageType> = (props):JSX.Element => {
    return(
    <div className={`${classes.package__wrapper} ${props.index % 2==0 ? ""  : classes.package__wrapper__left}`}>
        <CustomHeader text={props.name} customClass={classes.package__header}/>
        <CustomImage customClass={classes.package__image} src={props.picture1} alt={'Kamila Koziara'}/>
        <CustomImage customClass={classes.package__image__two} src={props.picture2} alt={'Kamila Koziara'}/>
        <div className={classes.package__text}>
            <p className={classes.package__price}>{`${props.price} PLN`}</p>
            <p className={classes.package__description}>{props.description}</p>
            <p className={classes.package__line}>Z czego składa się pakiet ?</p>
            <p className={classes.package__content}>{props.content}</p>
            <ButtonCalendar black={false} text="Sprawdź datę" fontAwesome={faCalendar} path="/contact"/>
        </div>
    </div>
    )
}