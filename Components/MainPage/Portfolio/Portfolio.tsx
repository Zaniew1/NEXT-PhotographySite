import classes from './Portfolio.module.css'
import {Button} from '../../UI/Buttons/Button';
import { PortfolioSliderDesktop } from './PortfolioSliderDesktop';
import {PortfolioSliderMobile} from './PortfolioSliderMobile';
import { UIContext } from '../../../Store/UI-context';
import { useContext, useState} from "react";
import { SliderNav } from '../../UI/SliderNav/SliderNav';
import { PortfolioElementType } from '../../../Types/types';
export const Portfolio = (props:{data:PortfolioElementType[]}) :JSX.Element=>{
    const { desktopResolution } = useContext(UIContext);
    const [current, setCurrent] = useState<number>(0);

    const [fetchedProperties] = useState<PortfolioElementType[]>(props.data);
    const previousSlideHandler = () => {
        if(current == 0){
          return
        }
        else{
          setCurrent(current+1);
        }
      };
      const nextSlideHandler = () => {
        if(current < ((-props.data.length)+4)){
          return
        }
        else{
          setCurrent(current-1);
        }
      };
    return (
        <div className={classes.portfolio__wrapper}>
            <div className={classes.portfolio__content}>
                <p className={classes.portfolio__header}>Reportaż i sesja ślubna</p>
                <Button text={'Portfolio'} path={'/portfolio'} className={classes.portfolio__button}/>
            </div> 
            {!desktopResolution && <PortfolioSliderMobile data={fetchedProperties}/>}
            {desktopResolution && <PortfolioSliderDesktop data={fetchedProperties} current={current}/>}
            {desktopResolution && <SliderNav black={true} index={current} customClass={classes.slider__navigation} length={props.data.length} moveLeft={previousSlideHandler} moveRight={nextSlideHandler} counterInvisible={true}/>}
        </div>
            )
        }
    