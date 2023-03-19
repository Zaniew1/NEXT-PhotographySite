import classes from './SinglePortfolio.module.css';
import { useRouter } from 'next/router';


import { CustomImage } from '../UI/Images/CustomImage';
type SinglePortfolioType = {
    id: string,
    key: string,
    url: string,
    name: string,
    orientation: number,
    index: number,
}
export const SinglePortfolio:React.FC<SinglePortfolioType> = (props):JSX.Element  =>{
    const router = useRouter();
    const navigateProgrammaticlyHandler = () =>{
        router.push(props.id);
    }
    return(
        <div onClick={navigateProgrammaticlyHandler} className={`${props.index%3==0 || props.index%2==0  ?(`${classes.single} ${classes.single__one}`) : (`${classes.single} ${classes.single__two}`)}`}>
            <CustomImage customClass={`${props.orientation == 1 ? classes.single__image__horizontal : classes.single__image__vertical}`} src={props.url} alt={"Zdjęcie pary"+props.name}/>
            <p className={classes.single__paragraph}>{props.name}</p>

        </div>
    )
}