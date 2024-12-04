import { atom } from "recoil";

export const gender = atom<"Male" | "Female" | null>({
    key : 'Gender',
    default : null
})