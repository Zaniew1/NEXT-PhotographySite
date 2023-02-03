import { UIContext } from "../../Store/UI-context";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";
import { useContext, Fragment} from "react";
import { blackNav } from "../../Types/types";
export const Header = (props: {black: blackNav}) =>{
  const { desktopResolution } = useContext(UIContext);

return (
    <Fragment>
    {!desktopResolution && <HeaderMobile black={props.black} />}
    {desktopResolution && <HeaderDesktop black={props.black} />}
    </Fragment>
);
}