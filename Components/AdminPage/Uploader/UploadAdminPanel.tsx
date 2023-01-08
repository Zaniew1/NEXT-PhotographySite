import { FormEvent, useState } from 'react';
import {PriceChanger} from './Changers/PriceChanger';
import {MainSliderChanger} from './Changers/MainSliderChanger';
import {OpinionChanger} from './Changers/OpinionChanger'
import {GalleryChanger} from './Changers/GalleryChanger'
import {PortfolioChanger} from './Changers/PortfolioChanger'
import classes from './UploadAdminPanel.module.css';
import { UploaderSquare } from './UploaderSquare';
import {uploaderEdit} from '../../../Data/Data';
export  const UploadAdminPanel: React.FC = (props) =>{
    const [divAction, setDivAction] = useState(0);
    const goBackHandler = () => {
        setDivAction(0);
    }
    const squareClickHandler = (event:React.MouseEvent<HTMLElement>)=>{
        const divName = (event.target as HTMLElement).textContent;
        uploaderEdit.forEach((el,index) => {
            if(divName === el.text){
                setDivAction(index+1)
            }
        })
    }
    return (
    <div className={classes.uploader}>
        <h2 className={classes.uploader__header}>Witaj w Panelu Admina</h2>
        <p className={classes.uploader__paragraph}>{divAction != 0 ? `Właśnie edytujesz: ${uploaderEdit[divAction -1].text}` : ` Co pragniesz edytować ? `}</p>
        {divAction == 0 && <div className={classes.uploader__wrapper}>
            {uploaderEdit.map((el)=>{
                return(
                <UploaderSquare onClick={squareClickHandler} key={Number(Math.random()*100)} text={el.text}/>
                );
            })}
        </div>}
        {divAction == 1 && <PriceChanger/>}
        {divAction == 2 && <MainSliderChanger/>}
        {divAction == 3 && <GalleryChanger/>}
        {divAction == 4 && <PortfolioChanger/>}
        {divAction == 5 && <OpinionChanger/>}
        { divAction != 0 && <div className={classes.uploader__back} onClick={goBackHandler}></div>}
    </div>)
}
