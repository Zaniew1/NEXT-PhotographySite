import { CustomHeader } from '../UI/CustomHeader';
import classes from './GalleryPage.module.css';
const galleryData=[
    {
        orientation: 1,
        size: 2,
        url:''
    },
    {
        orientation: 1,
        size: 2,
        url:''
    },
    {
        orientation: 1,
        size: 2,
        url:''
    },
    {
        orientation: 1,
        size: 2,
        url:''
    },
    {
        orientation: 1,
        size: 2,
        url:''
    },
    {
        orientation: 1,
        size: 2,
        url:''
    },
    {
        orientation: 1,
        size: 2,
        url:''
    },
    {
        orientation: 1,
        size: 2,
        url:''
    },
]
export const GalleryPage: React.FC = () => {
    return(
        <section className={classes.gallery}>
            <CustomHeader customClass={classes.gallery__header} text={'inspiracje fotografii ślubnej'}/>
            <p className={classes.gallery__paragraph}>Wyróżnić się jako fotograf ślubny może być bardzo trudne. Staram się, aby styl fotografii ślubnej był wyjątkowy i kreatywny dla każdej pary. Lubię robić reportaży o dniu ślubu, a także urzeczywistniać styl w mojej pracy.</p>
        </section>
    )
}