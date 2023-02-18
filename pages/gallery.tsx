import { Header } from './../Components/Header/Header';
import { CustomHeader } from './../Components/UI/CustomHeader';
import classes from './gallery.module.css';
import {useContext, useState} from 'react';
import { DataContext } from '../Store/Data-context';
import { galleryData } from '../Data/Data';
import { Footer } from '../Components/Footer/Footer';
import Image from 'next/image';
 const Gallery = () => { 
  let galleryClass = '';
  return (
    <main>
      <Header black={true}/>
        <section className={classes.gallery}>
            <CustomHeader customClass={classes.gallery__header} text={'inspiracje fotografii ślubnej'}/>
            <p className={classes.gallery__paragraph}>Wyróżnić się jako fotograf ślubny może być bardzo trudne. Staram się, aby styl fotografii ślubnej był wyjątkowy i kreatywny dla każdej pary. Lubię robić reportaży o dniu ślubu, a także urzeczywistniać styl w mojej pracy.</p>
            <div className={classes.gallery__wrapper}>
              {galleryData.map((el, index)=>{
                
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
        </section>
        <Footer/>
    </main>
  );};
export default Gallery;