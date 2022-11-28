import GAMEDATA_LOCAL_STORAGE_KEY from "../constants";
import { GameDataStorageType } from "../types";

const getGameDataLocalStorage = () => {
  if (!localStorage.getItem(GAMEDATA_LOCAL_STORAGE_KEY)) {
    return {
      X: 0,
      O: 0,
      BOTH: 0
    } as GameDataStorageType;
  }
  return JSON.parse(
    localStorage.getItem(GAMEDATA_LOCAL_STORAGE_KEY) || "{}"
  ) as GameDataStorageType;
};

const setGameDataLocalStorage = (storage: GameDataStorageType) => {
  localStorage.setItem(GAMEDATA_LOCAL_STORAGE_KEY, JSON.stringify(storage));
};

export { getGameDataLocalStorage, setGameDataLocalStorage };
