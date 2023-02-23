import classes from './Portfolio.module.css'
import {Button} from '../../UI/Button';
import { PortfolioSliderDesktop } from './PortfolioSliderDesktop';
import {PortfolioSliderMobile} from './PortfolioSliderMobile';
import { UIContext } from '../../../Store/UI-context';
import { useContext} from "react";
export const Portfolio =()=>{
    const { desktopResolution } = useContext(UIContext);
    return (
        <div className={classes.portfolio__wrapper}>
            <div className={classes.portfolio__content}>
                <p className={classes.portfolio__header}>Reportaż i sesja ślubna</p>
                <Button text={'Portfolio'} path={'/portfolio'} className={classes.portfolio__button}/>
            </div> 
            {!desktopResolution && <PortfolioSliderMobile  />}
            {desktopResolution && <PortfolioSliderDesktop />}
        </div>
            
            
            )
            
        }
    