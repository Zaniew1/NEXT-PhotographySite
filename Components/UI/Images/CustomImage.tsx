import classes from './CustomImage.module.css';
import Image from 'next/image'
import { CustomImageType } from '../../../Types/types';
export const CustomImage:React.FC<CustomImageType> = (props:CustomImageType): JSX.Element =>{
    return (
        <div className={`${props.customClass !== "" ? `${classes.image__wrapper} ${props.customClass}` : classes.image__wrapper}`}>
            <Image
            src={props.src}
            alt={props.alt}
            fill
            style={{objectFit:"cover"}}
            className={classes.slider__image}
            />
        </div>
    )
}