import classes from './GalleryPictures.module.css';
import Image from 'next/image';
type GalleryPicturesType = {
    data: {
        size:number, 
        orientation: number,
        url:string,
        name:string
       }[];
}
export const GalleryPictures = (props:GalleryPicturesType) => {
    let galleryClass:string = '';
    return (
    <div className={classes.gallery__wrapper}>
    {props.data.map((el, index)=>{
      
      if(el?.orientation == 1 && el?.size == 1){
        galleryClass = classes.gallery__image__horizontal__small;
       }else if(el?.orientation == 1 && el?.size == 2){
        galleryClass = classes.gallery__image__horizontal__medium;
       }else  if(el?.orientation == 1 && el?.size == 3){
        galleryClass = classes.gallery__image__horizontal__large;
       }else  if(el?.orientation == 2 && el?.size == 1){
        galleryClass = classes.gallery__image__vertical__small;
       }else  {
        galleryClass = classes.gallery__image__vertical__medium;
       }
      return (   
        <div className={galleryClass} key={el.url+index}>
      <Image
      src={el.url}
      alt={el.name}
      layout="fill"
      objectFit="cover"
      className={classes.gallery__image}
    />
    </div>)
    })}
  </div>
    );
    
}