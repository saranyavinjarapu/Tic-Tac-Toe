import { GAMEDATA_LOCAL_STORAGE_KEY } from "../constants";
import { GameDataStorageType } from "../types";

export const setLocalStorage = (storage: GameDataStorageType) => {
  localStorage.setItem(GAMEDATA_LOCAL_STORAGE_KEY, JSON.stringify(storage));
};
