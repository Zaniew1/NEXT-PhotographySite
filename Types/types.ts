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
export type DataContextType ={
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


export type ContextPropsType = {
  children: React.ReactNode
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
export type OpinionPropertiesToSendType = {name:string, url: string, description:string, id:string, date: number} | {}
export type MainPropertiesToSendType = {name:string, url: string, id:string, date: number} | {}
export type GalleryPropertiesToSendType = {name:string, url: string, id:string, date: number, size:number, orientation: number} | {}
export type PricePropertiesToSendType = {content:string, description:string, price: number, id:string, date:number, url1:string, url2:string} | {};
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
  className?: string,
}
export type OffertPackageType = {
  index:number,
  name: string,
  price: number,
  description: string,
  content: string,
  picture1: string,
  picture2: string
}