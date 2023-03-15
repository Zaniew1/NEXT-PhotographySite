
import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
import { Questions } from './../Components/MainPage/Questions/Questions';
import {Opinions} from '../Components/MainPage/Opinions/Opinions'
import {Portfolio} from '../Components/MainPage/Portfolio/Portfolio';
import { firebaseFirestore } from './../Firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import {MainElementType} from '../Types/types'
const Home:React.FC<{slider:MainElementType[]}> = (props):JSX.Element => {
  console.log(props)
  
  return (
    <main>
      <Header black={false}/>
      <Slider data={props.slider}/>
      <About />
      <Portfolio/>
      <Opinions/>
      <Questions/>
      <Footer />
    </main>
  );
}
export async function getStaticProps(){
  const allCollection = collection(firebaseFirestore, "MainSlider");
    const data = await getDocs(allCollection);
    const formattedData = data.docs.map(
      (doc): MainElementType => ({
        ...(doc.data() as MainElementType),
        id: doc.id,
      })
    );
    const sortedStoreData = [...formattedData].sort(
        (a: MainElementType, b: MainElementType) => a.date - b.date
      );
  return {
      props:{
         slider: sortedStoreData
      },
      revalidate: 3600
  }
};
export default Home;
