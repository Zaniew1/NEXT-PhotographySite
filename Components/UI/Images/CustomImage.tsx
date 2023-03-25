import classes from './CustomImage.module.css';
import Image from 'next/image'
import { useContext} from "react";
import { UIContext } from "../../../Store/UI-context";
import { CustomImageType } from '../../../Types/types';
export const CustomImage:React.FC<CustomImageType> = (props:CustomImageType): JSX.Element =>{
    const { desktopResolution } = useContext(UIContext);
    return (
        <div className={`${props.customClass !== undefined ? `${classes.image__wrapper} ${props.customClass}` : classes.image__wrapper}`}>
            {desktopResolution ? 
            <Image
            src={props.src}
            alt={props.alt}
            quality={70}
            fill
            priority
            style={{objectFit:"cover"}}
            className={`${props.imageClass !== undefined ? `${classes.slider__image} ${props.imageClass}` : classes.slider__image}`}
            />
            : <Image
            src={props.src}
            alt={props.alt}
            quality={30}
            fill
            priority
            style={{objectFit:"cover"}}
            className={`${props.imageClass !== undefined ? `${classes.slider__image} ${props.imageClass}` : classes.slider__image}`}
            />}
        </div>
    )
}