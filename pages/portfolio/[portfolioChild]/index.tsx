import { firebaseFirestore } from './../../../Firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import {PortfolioChild} from'../../../Components/PortfolioChild/PortfolioChild';

export async function getStaticProps(){
    const allCollection = collection(firebaseFirestore, "Portfolio");
      const data = await getDocs(allCollection);
      const formattedData = data.docs.map(
        (doc): PortfolioElementType => ({
          ...(doc.data() as PortfolioElementType),
          id: doc.id,
        })
      );
      const sortedStoreData = [...formattedData].sort(
          (a: PortfolioElementType, b: PortfolioElementType) => a.date - b.date
        );
    return {
        props:{
           portfolio: sortedStoreData
        },
        revalidate: 3600
    }
}
;

// import { PortfolioElementType } from '../../../Types/types';
type PortfolioElementType = { name:string, description:string,  id:string, date:number, url:string, content: string, orientation:number, pictures:{}[]};
type AllPortfoliosType = PortfolioElementType[];
const Weeding:React.FC<PortfolioElementType> = (props):JSX.Element => {
    
    return (
        <PortfolioChild
            name={props.name}
            description={props.description}
            url={props.url}
            content={props.content}
            pictures={props.pictures}
        />
        );
    };

export default Weeding
