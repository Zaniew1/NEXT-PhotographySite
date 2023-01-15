import classes from './Portfolio.module.css'
import {Button} from '../../UI/Button';
import { PortfolioSlider } from './PortfolioSlider';

export const Portfolio =()=>{

  
  
    return (
        <>
              <div className={classes.portfolio__content}>
                  <p className={classes.portfolio__header}>Reportaż i sesja ślubna</p>
                  <Button text={'Portfolio'} path={'/portfolio'} className={classes.portfolio__button}/>
              </div> 
            <PortfolioSlider/>
            
        </>
            
            
            )
            
        }
    