import classes from './UploaderSquare.module.css'
type UploaderSquareProps = {
    text: string,
    key: number,
    onClick: (event:React.MouseEvent<HTMLElement>) => void,
}
export  const UploaderSquare = (props: UploaderSquareProps) =>{
   
    return (
        <div onClick={props.onClick} className={classes.uploader__square}>{props.text}</div>
    )

};