
import { Header } from './../Components/Header/Header';
import { OpinionCard } from '../Components/OpinionPage/OpinionCard';
const Opinion:React.FC = ():JSX.Element => {
    return (
        <main>
          <Header black={false}/>
          <OpinionCard/>
         
        </main>
      );
};
export default Opinion
