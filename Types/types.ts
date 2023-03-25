export type BooleanElementType = { drops: boolean, black:boolean };
export type NavigationLinkType = {
  text: string;
  classLi: string;
  classLink: string;
  classLinkActive: string;
  path: string;
};
export type dropDownNavType = boolean;
export type UiContextType = {
  drop: dropDownNavType;
  desktopResolution: boolean;
  dropDownNav: (dropNav: dropDownNavType) => void;
};
export type ContextPropsType = {
  children: React.ReactNode
}
export type DataContextType = {
  dataSlider: {},
  dataOffer: {},
  dataOpinion: {},
  dataGallery: {},
  dataPortfolio: {},
  setDataSlider: (data: {}[]) => void,
  setDataOffer: (data: {}[]) => void,
  setDataOpinion: (data: {}[]) => void,
  setDataGallery: (data: {}[]) => void,
  setDataPortfolio: (data: {}[]) => void,
}


export type UploadProgressType = number
export type UploadErrorType = string
export type UploadUrlType = string
export type SnapType = {
  bytesTransferred: number,
  totalBytes: number,
  state: string,

}
export type SelectedFileToUploadType = {
  name: string,
  lastModified: number,
  type: string
} | null

export type ButtonType = {text: string, className:string, path: string};

import {  IconDefinition } from "@fortawesome/fontawesome-svg-core";
export type ButtonCallendarType = {text: string, fontAwesome: IconDefinition | null, path: string, black:boolean};
export type SetFileType = (param: any) => void
export type InputRef = string | null
export type InputRefNumber = number | null
export type CustomHeaderType = {
  customClass:string | null,
  text: string
}
export type BackgroundImageProps = {
  src: string,
  alt:string,
  classContainer:string
}
export type AuthContextType = {
  loggedIn: boolean,
  loggedInFunction: (logged: boolean) => void,
}
export type AddAdminType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number}

export type EditOpinionType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:OpinionElementType }
export type EditMainType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:MainElementType } 
export type EditPortflioType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:PortfolioElementType}
export type EditGalleryType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:GalleryElementType }
export type EditPriceType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:PriceElementType }


export type OpinionPropertiesToSendType = {name:string, url: string, description:string, id:string, date: number} | {}
export type MainPropertiesToSendType = {name:string, url: string, id:string, date: number} | {}
export type GalleryPropertiesToSendType = {name:string, url: string, id:string, date: number, size:number, orientation: number} | {}
export type PricePropertiesToSendType = {content:string, description:string, price: string, id:string, date:number, url1:string, url2:string} | {};
export type PortfolioPropertiesToSendType = { name:string, description:string, content:string,  id:string, date:number, url:string, orientation:number, pictures:{name:string, size:number, orientation: number,  date:number, url:string}[]} | {};

export type GalleryElementType = {name:string, size:number, orientation: number, id:string, date:number, url:string};
export type MainElementType = {name:string, id:string, date:number, url:string};
export type OpinionElementType = {name:string, description: string, id:string, date:number, url:string};
export type PortfolioElementType = { name:string, description:string, content:string,  id:string, date:number, url:string, orientation:number, pictures:{name:string, size:number, orientation: number,  date:number, url:string}[]} 
export type PriceElementType = {content:string, name:string, description:string, price: string, id:string, date:number, url1:string, url2:string};

export type blackNav = boolean;
export type GalleryPicturesType = {
  data: {
      size:number, 
      orientation: number,
      url:string,
      name:string
     }[];
}
export type CustomImageType = {
  src: string,
  alt: string,
  customClass?: string,
  key?: string,
  layout?:"fill",
  objectFit?:"cover",
  imageClass?: string,
}
export type OffertPackageType = {
  index:number,
  name: string,
  price: string,
  description: string,
  content: string,
  picture1: string,
  picture2: string
}