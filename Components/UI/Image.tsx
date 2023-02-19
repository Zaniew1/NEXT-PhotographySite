
import classes from './Image.module.css';
type ImageType = {
    src: string,
    alt: string,
    customClass?: string,
    key?: string,
    layout?:"fill",
    objectFit?:"cover",
    className?: string,
}

export const Image:React.FC<ImageType> = (props:ImageType): JSX.Element =>{
    // return (
    //     <div key={props.key} className={`${props.customClass == "" ? `${classes.image__wrapper} ${props.customClass}` : classes.image__wrapper}`}>
    //         <Image
    //         src={props.src}
    //         alt={props.alt}
    //         layout={props.layout}
    //         objectFit={props.objectFit}
    //         className={classes.slider__image}
    //         />
    //     </div>
    // )
}