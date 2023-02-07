import { CustomHeader } from "../UI/CustomHeader"
import classes from './OffertPackage.module.css';
import Image from "next/image";
import { Button } from "../UI/Button";
import { ButtonCalendar } from "../UI/ButtonCalendar";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

type OffertPackage = {
    index:number,
    name: string,
    price: number,
    description: string,
    content: string,
    picture1: string,
    picture2: string
}
export const OffertPackage = (props:OffertPackage) => {
    
    return(
    <div className={`${classes.package__wrapper} ${props.index%2==0 ? ""  : classes.package__wrapper__left}`}>
        <CustomHeader text={props.name} customClass={classes.package__header}/>
            <div className={classes.package__image}>
                <Image
                    src={props.picture1}
                    alt='Kamila Koziara'
                    layout="fill"
                    objectFit="cover"
                    className={classes.package__img}
                />
            </div>
            <div className={classes.package__image__two}>
                <Image
                    src={props.picture2}
                    alt='Kamila Koziara'
                    layout="fill"
                    objectFit="cover"
                    className={classes.package__img__two}
                />
            </div>
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