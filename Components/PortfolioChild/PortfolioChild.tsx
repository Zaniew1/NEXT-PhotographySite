import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import classes from './PortfolioChild.module.css';
import { CustomHeader } from '../../Components/UI/Texts/CustomHeader';
import Image from 'next/image';
import { galleryData } from '../../Data/Data';
import { GalleryPictures } from '../../Components/GalleryPictures/GalleryPictures';
import {Portfolio} from '../../Components/MainPage/Portfolio/Portfolio';
import { ContactFormWithText } from '../../Components/Form/ContactFormWithText';
import { PortfolioElementType } from '../../Types/types';
type aa = {url: string, content:string, description:string, pictures:{}[], name:string}
export const PortfolioChild:React.FC<aa>= (props):JSX.Element => {
    const {url, name, content, description, pictures} = props as aa
    return (
        <section className={classes.child}>
            <Header black={false}/>
            <div className={classes.child__image__wrap}>
                <Image
                    src={url}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className={classes.child__image}
                />
                <p className={classes.child__names}>{name}</p>
            <CustomHeader customClass={classes.child__header} text={content}/>
            </div>
            <div className={classes.child__description__wrap}>
                <p className={classes.child__description}>{description}</p>
            </div>
            {/* <GalleryPictures data={pictures}/> */}
            <Portfolio/>
            <ContactFormWithText text={'POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!'}/>
            <Footer />
        </section>
      );
};
