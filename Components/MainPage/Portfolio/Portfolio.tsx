import classes from './Portfolio.module.css'
import {Button} from '../../UI/Buttons/Button';
import { PortfolioSliderDesktop } from './PortfolioSliderDesktop';
import {PortfolioSliderMobile} from './PortfolioSliderMobile';
import { UIContext } from '../../../Store/UI-context';
import { useContext} from "react";
import { useFetchFirestore } from '../../../hooks/useFetchFirestore';
import { PortfolioElementType } from '../../../Types/types';
export const Portfolio:React.FC = () :JSX.Element=>{
    const { desktopResolution } = useContext(UIContext);
    const fetchedProperties:PortfolioElementType[] | {}[]= useFetchFirestore('Portfolio');
    return (
        <div className={classes.portfolio__wrapper}>
            <div className={classes.portfolio__content}>
                <p className={classes.portfolio__header}>Reportaż i sesja ślubna</p>
                <Button text={'Portfolio'} path={'/portfolio'} className={classes.portfolio__button}/>
            </div> 
            {!desktopResolution && <PortfolioSliderMobile data={fetchedProperties}  />}
            {desktopResolution && <PortfolioSliderDesktop data={fetchedProperties}/>}
        </div>
            )
        }
    