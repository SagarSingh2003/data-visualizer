import { atom } from "recoil";

export const askPermissionForStoringCookies = atom<false | true | null>({
    key : 'AskPermissionForStoringCookies',
    default : null
})