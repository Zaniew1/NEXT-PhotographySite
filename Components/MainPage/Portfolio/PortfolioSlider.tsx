import classes from './PortfolioSlider.module.css';
import Image from 'next/image';
import { portfolioData } from '../../../Data/Data';
import { CustomImage } from '../../UI/CustomImage';

export const PortfolioSlider:React.FC = () => {
    const {thumbnail, name} = portfolioData[0];
 return(
    <div className={classes.slider__carousel}>
        <div className={classes.slider__container}>
            <CustomImage customClass={classes.slider__image__wrap} src={thumbnail} alt={name}/>
            <p className={classes.slider__names}>{name}</p>
        </div>
        <div className={classes.slider__container}>
            <CustomImage customClass={classes.slider__image__wrap} src={thumbnail} alt={name}/>
            <p className={classes.slider__names}>{name}</p>
        </div>
    </div>
   );

}