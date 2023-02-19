import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import classes from './Agata&Mateusz.module.css';
import { CustomHeader } from '../../Components/UI/CustomHeader';
import Image from 'next/image';
import { portfolioData } from '../../Data/Data';
import { galleryData } from '../../Data/Data';
import { GalleryPictures } from '../../Components/GalleryPictures/GalleryPictures';
import {Portfolio} from '../../Components/MainPage/Portfolio/Portfolio';
import { ContactFormWithText } from '../../Components/Form/ContactFormWithText';
const Weeding = () => {
    let galleryClass:string = '';
    return (
        <section className={classes.weeding}>
            <Header black={false}/>
            <div className={classes.weeding__image__wrap}>
                <Image
                    src={'/../public/img/1.jpg'}
                    alt={''}
                    layout="fill"
                    objectFit="cover"
                    className={classes.weeding__image}
                />
                <p className={classes.weeding__names}>Agata & Mateusz</p>
            <CustomHeader customClass={classes.weeding__header} text={'Wedding at saint paul de vence'}/>
            </div>
            <div className={classes.weeding__description__wrap}>
                <p className={classes.weeding__description}>This wedding take a place at a small town at St. Paul de Vence. Emil & Christina came from Sweden to celebrate their wedding at family owned villa, followed by the dinner at Michelin restaurant Alain Llorca. The ceremony took place at the green terrace with beautiful view to the city and was made by the Swedish priest. After the ceremony we went to the cocktail, having a lot of fun with their guests and enjoy the time. After that, the party was loud and crazy!</p>
            </div>
            <GalleryPictures data={galleryData}/>
            <Portfolio/>
            <ContactFormWithText text={'POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!'}/>
            <Footer />
        </section>
      );
};
export default Weeding
