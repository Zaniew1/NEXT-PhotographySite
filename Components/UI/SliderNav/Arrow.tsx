import classes from './Arrow.module.css'
export const Arrow: React.FC<{direction:string, customClass?:string, black:boolean, onClick?:()=>void  }> = (props): JSX.Element=>{
    let direction:string = '';
    if(props.direction === 'right'){
        direction = classes.arrow__right
    }
    if(props.direction === 'left'){
        direction = classes.arrow__left
    }
    if(props.direction === 'up'){
        direction = classes.arrow__up
    }
    if(props.direction === 'down'){
        direction = classes.arrow__down
    }
    return(
        <div onClick={props.onClick} className={`${props.customClass ? `${props.customClass} ${`${classes.arrow__wrapper} ${direction}`}`: `${classes.arrow__wrapper} ${direction}`}`} >
            <span className={props.black ? `${classes.arrow__line} ${classes.arrow__black__line}` : classes.arrow__line}></span>
            <span className={props.black ? `${classes.arrow__triangle} ${classes.arrow__black__triangle}` : classes.arrow__triangle}></span>
        </div>
    )
}