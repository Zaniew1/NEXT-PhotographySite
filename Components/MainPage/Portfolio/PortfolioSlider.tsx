import classes from './PortfolioSlider.module.css';
import Image from 'next/image';
import { portfolioData } from '../../../Data/Data';

export const PortfolioSlider:React.FC = () => {
    console.log(portfolioData)
    const {thumbnail, name} = portfolioData[0];
 return(
    <div className={classes.slider__carousel}>
        <div className={classes.slider__container}>
            <div className={classes.slider__image__wrap}>
            <Image
            src={thumbnail}
            alt={name}
            layout="fill"
            objectFit="cover"
            className={classes.slider__image}
            />
            </div>
            <p className={classes.slider__names}>{name}</p>
        </div>
        <div className={classes.slider__container}>
            <div className={classes.slider__image__wrap}>
            <Image
            src={thumbnail}
            alt={name}
            layout="fill"
            objectFit="cover"
            className={classes.slider__image}
            />
            </div>
            <p className={classes.slider__names}>{name}</p>
        </div>
    </div>
   );

}