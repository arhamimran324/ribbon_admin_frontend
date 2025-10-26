import { WebStorage } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = (): WebStorage => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

export const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
