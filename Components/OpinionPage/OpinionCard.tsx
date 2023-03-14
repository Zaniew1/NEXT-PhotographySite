import { Footer } from '../Footer/Footer';
import { Questions } from '../MainPage/Questions/Questions';
import classes from './OpinionCard.module.css';
import Image from 'next/image'
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import { Arrow } from '../UI/SliderNav/Arrow';
import { OpinionElementType } from '../../Types/types';
export const OpinionCard:React.FC = (): JSX.Element =>{
    const fetchedProperties:{id:string, url:string, name:string, description:string, date:number}[] | {}[] = useFetchFirestore('Opinion');
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
            {fetchedProperties.map((element:OpinionElementType|{},index)=>{
                const {name, description, url,} = element as OpinionElementType;
                return(
                <div className={classes.card__element} key={Math.random()*index} >
                    <Image
                        src={url}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={classes.card__paragraph__wrapper}>
                        <p className={classes.card__paragraph}>&quot; {description} &quot;</p>
                        <p className={classes.card__names}>{name}</p>
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