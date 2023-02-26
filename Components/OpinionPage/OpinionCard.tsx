import { Footer } from '../Footer/Footer';
import { Questions } from '../MainPage/Questions/Questions';
import classes from './OpinionCard.module.css';
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { opinionsSlider } from '../../Data/Data';
import { Arrow } from '../UI/SliderNav/Arrow';
export const OpinionCard:React.FC = (): JSX.Element =>{
    return(
        <div className={classes.card}>
             <div className={classes.card__element} >
                    <Image
                        src={'/../public/img/15.jpg'}
                        alt={'asd'}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={classes.card__paragraph__wrapper}>
                        <p className={classes.card__feedback}>KIND WORDS FROM MY BRIDES & GROOMS</p>
                        <p className={classes.card__paragraph}>&quot; Thanks to everyone for your feedback about my wedding or pre-wedding photography. It means a lot to me that you love the images and having a great time with me as your photographer. &quot;</p>
                        <Arrow customClass={classes.card__icon} direction={'down'} black={false}/>
                    </div>
                </div>
            {opinionsSlider.map((el,index)=>{
                return(
                <div className={classes.card__element} key={Math.random()*index} >
                    <Image
                        src={el.src}
                        alt={'asd'}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={classes.card__paragraph__wrapper}>
                        <p className={classes.card__paragraph}>&quot; {el.comment} &quot;</p>
                        <p className={classes.card__names}>{el.text}</p>
                    </div>
                </div>
                )
                })}
                 <div className={`${classes.card__element} ${classes.card__element__footer}`}  >
                   <Questions/>
                    <Footer />
                </div>
        </div>

    )
}