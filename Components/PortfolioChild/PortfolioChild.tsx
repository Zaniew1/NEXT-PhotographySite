import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import classes from './PortfolioChild.module.css';
import { CustomHeader } from '../../Components/UI/Texts/CustomHeader';
import Image from 'next/image';
import { GalleryPictures } from '../../Components/GalleryPictures/GalleryPictures';
import { ContactFormWithText } from '../../Components/Form/ContactFormWithText';
export type PortfolioElementType = { name:string, description:string, content:string,  id:string, date:number, url:string, orientation:number, pictures:{name:string, size:number, orientation: number, date:number, url:string}[]} 
export const PortfolioChild:React.FC<{data:PortfolioElementType}>= (props):JSX.Element => {
    const {url, name, content, description, pictures} = props.data as PortfolioElementType;
    console.log(props.data)
    return (
        <section className={classes.child}>
            <Header black={false}/>
            <div className={classes.child__image__wrap}>
                <Image
                    src={url}
                    alt={name}
                    fill
                    style={{objectFit:"cover"}}
                    className={classes.child__image}
                />
                <p className={classes.child__names}>{name}</p>
            <CustomHeader customClass={classes.child__header} text={content}/>
            </div>
            <div className={classes.child__description__wrap}>
                <p className={classes.child__description}>{description}</p>
            </div>
            <GalleryPictures data={pictures}/>
            <ContactFormWithText text={'POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!'}/>
            <Footer />
        </section>
      );
};
