
import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
import { Questions } from './../Components/MainPage/Questions/Questions';
import {Opinions} from '../Components/MainPage/Opinions/Opinions'
import {Portfolio} from '../Components/MainPage/Portfolio/Portfolio';
import { firebaseFirestore } from './../Firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import {MainElementType, PortfolioElementType,OpinionElementType} from '../Types/types'
const Home:React.FC<{slider:MainElementType[],portfolio:PortfolioElementType[], opinion:OpinionElementType[]}> = (props):JSX.Element => {
  
  return (
    <main>
      <Header black={false}/>
      <Slider data={props.slider}/>
      <About />
      <Portfolio data={props.portfolio}/>
      <Opinions data={props.opinion}/>
      <Questions/>
      <Footer />
    </main>
  );
}
export async function getStaticProps(){
  const dataSlider = await getDocs(collection(firebaseFirestore, "MainSlider"));
  const dataPortfolio = await getDocs(collection(firebaseFirestore, "Portfolio"));
  const dataOpinion = await getDocs(collection(firebaseFirestore, "Opinion"));

  const formattedDataSlider = dataSlider.docs.map(
    (doc): MainElementType => ({
      ...(doc.data() as MainElementType),
      id: doc.id,
    })
  );
  const formattedDataPortfolio = dataPortfolio.docs.map(
    (doc): PortfolioElementType => ({
      ...(doc.data() as PortfolioElementType),
      id: doc.id,
    })
  );
  const formattedDataOpinion = dataOpinion.docs.map(
    (doc): OpinionElementType => ({
      ...(doc.data() as OpinionElementType),
      id: doc.id,
    })
  );
  const sortedStoreDataSlider = [...formattedDataSlider].sort(
    (a: MainElementType, b: MainElementType) => a.date - b.date
  );
  const sortedStoreDataPortfolio = [...formattedDataPortfolio].sort(
    (a: PortfolioElementType, b: PortfolioElementType) => a.date - b.date
  );
  const sortedStoreDataOpinion = [...formattedDataOpinion].sort(
    (a: OpinionElementType, b: OpinionElementType) => a.date - b.date
  );
  return {
      props:{
        portfolio:sortedStoreDataPortfolio,
        opinion:sortedStoreDataOpinion,
        slider: sortedStoreDataSlider
      },
      revalidate: 60
  }
};

export default Home;
