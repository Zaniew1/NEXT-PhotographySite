import { Footer } from '../Components/Footer/Footer';
import { Header } from './../Components/Header/Header';
import {ContactFormWithText} from '../Components/Form/ContactFormWithText'
import { Questions } from '../Components/MainPage/Questions/Questions';
import { OpinionCard } from '../Components/OpinionPage/OpinionCard';
const Opinion = () => {
    return (
        <main>
          <Header black={false}/>
          <OpinionCard/>
          <Questions/>
          <Footer />
        </main>
      );
};
export default Opinion
