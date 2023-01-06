import { FormEvent, useState } from 'react';
import {PriceChanger} from './Changers/PriceChanger';
import classes from './UploadAdminPanel.module.css';
import { UploaderSquare } from './UploaderSquare';
import {uploaderEdit} from '../../../Data/Data';
export  const UploadAdminPanel: React.FC = (props) =>{
    const [divAction, setDivAction] = useState(0);
    const squareClickHandler = (event:React.MouseEvent<HTMLElement>)=>{
        const divName = (event.target as HTMLElement).textContent;
        uploaderEdit.forEach((el,index) => {
            if(divName === el.text){
                setDivAction(index+1)
            }
        })
    }
    console.log(divAction)

    return (
    <div className={classes.uploader}>
        <h2 className={classes.uploader__header}>Witaj w Panelu Admina</h2>
        <p className={classes.uploader__paragraph}>Co pragniesz edytować ? </p>
        {divAction == 0 && <div className={classes.uploader__wrapper}>
            {uploaderEdit.map((el)=>{
                return(
                <UploaderSquare onClick={squareClickHandler} key={Number(Math.random()*100)} text={el.text}/>
                );
            })}
        </div>}
        {divAction == 1 && <PriceChanger/>}
    </div>)
}
