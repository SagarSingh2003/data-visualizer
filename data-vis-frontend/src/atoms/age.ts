import { atom} from "recoil";

export const age = atom<"15-25" | ">25" | null >({
    key : 'Age',
    default : null
})