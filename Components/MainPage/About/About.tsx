import classes from './About.module.css';
import Image from "next/image";
import { Button } from '../../UI/ButtonCalendar';
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const About:React.FC = (props) => {
    return (
    <section className={classes.about}>
   
       
    <div className={classes.about__wrapper}>
        <h2 className={classes.about__header}>Moja historia</h2>
        <p className={classes.about__paragraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nihil eaque quas odit reiciendis pariatur autem doloremque necessitatibus doloribus dicta suscipit modi, et aspernatur porro voluptas labore ut iusto harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aliquam incidunt vero. Suscipit accusamus veritatis nam fugit sequi atque odit eum repudiandae reiciendis similique! Sit at similique ex expedita fuga.</p>
        <Button text="O mnie" fontAwesome={faUser} path="/about"/>
    </div>
    <div className={classes.about__picture}>
        <Image
                src={'/../public/img/kamila.jpg'}
                alt='Kamila Koziara'
                layout="fill"
                objectFit="cover"
                className={classes.about__image}
              />
        </div>
    </section>)
}