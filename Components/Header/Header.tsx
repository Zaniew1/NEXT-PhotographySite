import { UIContext } from "../../Store/UI-context";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";
import { useContext, Fragment} from "react";
export const Header = () =>{
  const { desktopResolution } = useContext(UIContext);

return (
    <Fragment>
    {!desktopResolution && <HeaderMobile />}
    {desktopResolution && <HeaderDesktop />}
    </Fragment>
);
}