import { GameDataStorageType } from "../types";

export const GAMEDATA_LOCAL_STORAGE = () => {
  if (!localStorage.getItem("game-data")) {
    return {
      X: 0,
      O: 0,
      BOTH: 0,
    } as GameDataStorageType;
  }
  return JSON.parse(
    localStorage.getItem("game-data") || "{}"
  ) as GameDataStorageType;
};
