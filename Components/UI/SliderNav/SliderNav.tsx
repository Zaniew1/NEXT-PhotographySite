import classes from './SliderNav.module.css';
import {Arrow} from './Arrow';
export const SliderNav:React.FC<{index:number, length:number, customClass?:string, black:boolean, counterInvisible?:boolean, moveLeft: ()=>void, moveRight:()=>void}> = (props):JSX.Element =>{
    let counterClass:string = '';
    if(props.black && !props.counterInvisible){
        counterClass = `${classes.slider__nav__counter} ${classes.black__counter}`;
    }
    else if(props.counterInvisible){
        counterClass = `${classes.slider__nav__counter} ${classes.invisible__counter}`;
    }
    else if(!props.black && !props.counterInvisible){
        counterClass = classes.slider__nav__counter;
    }



    return(
        <div className={props.customClass ? `${classes.slider__nav__wrapper} ${props.customClass}` : classes.slider__nav__wrapper} >
            <Arrow direction={'left'}  black={props.black} onClick={props.moveLeft}/>
            <div className={counterClass}>
                <span>{props.index+1}</span>
                <span className={classes.slider__nav__slash}>/ </span>
                <span>{props.length}</span>
            </div>
            <Arrow direction={'right'} black={props.black} onClick={props.moveRight}/>
        </div>
    )
} 