import { atom} from "recoil";

export const currUuid = atom<string | null >({
    key : 'CurrUuid',
    default : null
})