import { firebaseFirestore } from './../../../Firebase/firebase-config';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import {PortfolioChild} from'../../../Components/PortfolioChild/PortfolioChild';
import { PortfolioElementType } from '../../../Types/types';



const Weeding:React.FC<{portfolio:PortfolioElementType}> = (props):JSX.Element => {
    
    return (
        <PortfolioChild
            data={props.portfolio}
        />
        );
    };

export default Weeding

export async function getStaticPaths(){
    const allCollection = collection(firebaseFirestore, "Portfolio");
    const data = await getDocs(allCollection);
    const formattedData = data.docs.map(
      (doc): PortfolioElementType => ({
          ...(doc.data() as PortfolioElementType),
          id: doc.id,

      })
    );
    return {
        fallback: false,
        paths:formattedData.map(item => ({
            params: { portfolioChild: item.id }
          }))
      
    }
}

export async function getStaticProps({ params }: { params: { portfolioChild: string }}){
    const allCollection = collection(firebaseFirestore, "Portfolio");
  const portfolioDocRef = doc(allCollection, params.portfolioChild);
  const portfolioDoc = await getDoc(portfolioDocRef);
  const portfolioItem = portfolioDoc.exists() ? portfolioDoc.data() : null;
    return {
        props:{
           portfolio: portfolioItem
        },
        revalidate: 3600
    }
}
;

// export async function getStaticProps(context:any){
//     const portfolioId = context.params.name
//     console.log(portfolioId)
//     const allCollection = collection(firebaseFirestore, "Portfolio");
//     // const portfolioDoc = await allCollection.doc(context.Weeding).get();
    
//       const data = await getDocs(allCollection);
//       const formattedData = data.docs.map(
//         (doc): PortfolioElementType => ({
//           ...(doc.data() as PortfolioElementType),
//           id: doc.id,
//         })
//       );
//       const sortedStoreData = [...formattedData].sort(
//           (a: PortfolioElementType, b: PortfolioElementType) => a.date - b.date
//         );
//     return {
//         props:{
//            portfolio: sortedStoreData
//         },
//         revalidate: 3600
//     }
// }
// ;