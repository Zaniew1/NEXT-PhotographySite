import { NavigationLinkType } from "../../Types/types";
import Link from "next/link";
import { useContext } from "react";
import { UIContext } from "../../Store/UI-context";

export const NavigationLinks: React.FC<NavigationLinkType> = (
  props
): JSX.Element => {
  const { drop, dropDownNav } = useContext(UIContext);
  const TurnOffDropDonwNav = () =>{
    drop ? dropDownNav(false) : dropDownNav(true);
  }
  const { text, path } = props;
  return (
    <li className={props.classLi}>
      <Link
        href={path}
        onClick={TurnOffDropDonwNav}
        className={
          drop ? props.classLink : `${props.classLink} ${props.classLinkActive}`
        }
      >
        {text}
      </Link>
    </li>
  );
};
