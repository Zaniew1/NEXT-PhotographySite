import classes from './GalleryPictures.module.css';
import { CustomImage } from '../UI/Images/CustomImage';
import { GalleryPicturesType } from '../../Types/types';
export const GalleryPictures:React.FC<GalleryPicturesType> = (props): JSX.Element => {
    let galleryClass:string = '';
    console.log(props.data)
    return (
    <div className={classes.gallery__wrapper}>
    {props.data.map((el, index)=>{
      if(el?.orientation == 0 && el?.size == 0){
        galleryClass = classes.gallery__image__horizontal__small;
       }else if(el?.orientation == 0 && el?.size == 1){
        galleryClass = classes.gallery__image__horizontal__medium;
       }else  if(el?.orientation == 0 && el?.size == 2){
        galleryClass = classes.gallery__image__horizontal__large;
       }else  if(el?.orientation == 1 && el?.size == 0){
        galleryClass = classes.gallery__image__vertical__small;
       }else  if(el?.orientation == 1 && el?.size == 1){
        galleryClass = classes.gallery__image__vertical__medium;
       }else  {
        galleryClass = classes.gallery__image__vertical__large;
       }
      return (<CustomImage customClass={galleryClass} key={el.url+index} alt={el.name} src={el.url}/>)
    })}
  </div>
    );
    
}