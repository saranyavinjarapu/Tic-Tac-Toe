import { GameDataStorageType } from "../types";

export const GAMEDATA_LOCAL_STORAGE_KEY = "game-data";

export const GAMEDATA_LOCAL_STORAGE = () => {
  if (!localStorage.getItem(GAMEDATA_LOCAL_STORAGE_KEY)) {
    return {
      X: 0,
      O: 0,
      BOTH: 0,
    } as GameDataStorageType;
  }
  return JSON.parse(
    localStorage.getItem(GAMEDATA_LOCAL_STORAGE_KEY) || "{}"
  ) as GameDataStorageType;
};
