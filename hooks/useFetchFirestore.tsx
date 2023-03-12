import { useState, useEffect } from 'react';
import { firebaseFirestore } from './../Firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import {
  GalleryElementType,
  MainElementType,
  OpinionElementType,
  PortfolioElementType,
  PriceElementType,
} from '../Types/types';

type FireStoreData =
  | GalleryElementType
  | MainElementType
  | OpinionElementType
  | PortfolioElementType
  | PriceElementType;

export const useFetchFirestore = (
  place: string,
  updateFetchedData?: number
): FireStoreData[] => {
  const [fireStoreData, setFireStoreData] = useState<FireStoreData[]>([]);

  useEffect(() => {
    const allCollection = collection(firebaseFirestore, place);
    const getData = async (): Promise<void> => {
      const data = await getDocs(allCollection);
      const formattedData = data.docs.map(
        (doc): FireStoreData => ({
          ...(doc.data() as FireStoreData),
          id: doc.id,
        })
      );
      setFireStoreData(formattedData);
    };
    getData();
  }, [place, updateFetchedData]);

  const sortedStoreData = [...fireStoreData].sort(
    (a: FireStoreData, b: FireStoreData) => a.date - b.date
  );
  return sortedStoreData;
};
