import { db } from "../../constants";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const collectionRef = collection(db, "products");

export const fetchUserDetails = (uid, setData) => {
  const docRef = doc(db, "users", uid);

  onSnapshot(docRef, (doc) => setData((prev) => ({ ...prev, ...doc.data() })));
};

export const fetchBestSellProducts = async () => {
  const q = query(collectionRef, where("ratings", ">=", 4));
  const querySnapshot = await getDocs(q);

  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return dataArr;
};

export const fetchProducts = async () => {
  const q = query(collectionRef, orderBy("createdAt", "asc"));

  const querySnapshot = await getDocs(q);

  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return dataArr;
};

export const fetchProduct = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), id: docSnap.id };
};

export const fetchSearchedProduct = async () => {
  const querySnapshot = await getDocs(collectionRef);

  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
};

export const fetchSimilarProduct = async (params) => {
  const { category, title } = params;

  const q = query(
    collectionRef,
    where("category", "==", category),
    where("title", "!=", title)
  );

  const querySnapshot = await getDocs(q);

  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
};
