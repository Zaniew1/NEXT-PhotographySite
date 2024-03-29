import { useContext, Fragment} from "react";
import { UIContext } from "../../Store/UI-context";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";
import { blackNav } from "../../Types/types";
export const Header:React.FC<{black: blackNav}> = (props):JSX.Element =>{
  const { desktopResolution } = useContext(UIContext);
return (
    <Fragment>
    {!desktopResolution && <HeaderMobile black={props.black} />}
    {desktopResolution && <HeaderDesktop black={props.black} />}
    </Fragment>
);
}