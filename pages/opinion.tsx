
import { Header } from './../Components/Header/Header';
import { Footer } from '../Components/Footer/Footer';
import { Questions } from '../Components/MainPage/Questions/Questions';
import classes from './opinion.module.css';
import Image from 'next/image'
import { Arrow } from '../Components/UI/SliderNav/Arrow';
import { OpinionElementType } from '../Types/types';
import { firebaseFirestore } from './../Firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
const Opinion:React.FC<{data:OpinionElementType[]}> = (props) : JSX.Element => {
    return (
        <main>
          <Header black={false}/>
          <div className={classes.card}>
             <div className={classes.card__element} >
                <div className={classes.card__background}></div>
                <Image
                  src={'/static/images/couple.jpg'}
                  alt={'Piękna para pozująca w sesji ślubnej'}
                  quality={80}
                  fill
                  priority
                  style={{
                  objectFit: 'cover',
                  }} 
                />
                <div className={classes.card__paragraph__wrapper}>
                    <p className={classes.card__feedback}>KIND WORDS FROM MY BRIDES & GROOMS</p>
                    <p className={classes.card__paragraph}>&quot; Thanks to everyone for your feedback about my wedding or pre-wedding photography. It means a lot to me that you love the images and having a great time with me as your photographer. &quot;</p>
                    <Arrow customClass={classes.card__icon} direction={'down'} black={false}/>
                </div>
              </div>
            {props.data?.map((element:OpinionElementType|{},index:number)=>{
                const {name, description, url,} = element as OpinionElementType;
                return(
                <div className={classes.card__element} key={Math.random()*index} >
                  <div className={classes.card__background}></div>
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
         
        </main>
      );
};


export async function getStaticProps(){
  const allCollection = collection(firebaseFirestore, "Opinion");
    const data = await getDocs(allCollection);
    const formattedData = data.docs.map(
      (doc): OpinionElementType => ({
        ...(doc.data() as OpinionElementType),
        id: doc.id,
      })
    );
    const sortedStoreData = [...formattedData].sort(
        (a: OpinionElementType, b: OpinionElementType) => a.date - b.date
      );
  return {
      props:{
         data: sortedStoreData
      },
      revalidate: 3600
  }
};
export default Opinion
