import { atom} from "recoil";

export const error = atom<any | null >({
    key : 'Error',
    default : null
})