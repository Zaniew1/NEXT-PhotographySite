import classes from './SinglePortfolio.module.css';
import Image from "next/image";
import Link from 'next/link';
import { CustomImage } from '../UI/CustomImage';
type SinglePortfolioType = {
    key: string,
    thumbnail: string,
    name: string,
    orientation: number,
    index: number
}
export const SinglePortfolio = (props:SinglePortfolioType)  =>{
    return(
        <div className={`${props.index%3==0 || props.index%2==0  ?(`${classes.single} ${classes.single__one}`) : (`${classes.single} ${classes.single__two}`)}`}>
            <Link className={classes.single__link}href={`http://localhost:3000/portfolio/${props.name.replace(/ /g,'')}`}>
                <CustomImage customClass={`${props.orientation == 1 ? classes.single__image__horizontal : classes.single__image__vertical}`} src={props.thumbnail} alt={"Zdjęcie pary"+props.name}/>
            <p className={classes.single__paragraph}>{props.name}</p>
        </Link>
        </div>
    )
}