import classes from './BackgroundImage.module.css';
import Image from 'next/image'
import {BackgroundImageProps} from '../../../Types/types'
export const BackgroundImage:React.FC<BackgroundImageProps> = (props):JSX.Element => {
    return (
        <div className={props.classContainer}>
            <Image 
                className={classes.background__image} 
                src={props.src} 
                alt={props.alt}
                quality={100}
                fill
                sizes="100vw"
                style={{
                objectFit: 'cover',
                }} 
            />
        </div>
    )
}