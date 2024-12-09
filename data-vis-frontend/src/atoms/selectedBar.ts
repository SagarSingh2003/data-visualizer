import { atom } from "recoil";

export const selectedBar = atom<any>({
    key : 'SelectedBar',
    default : "A"
})