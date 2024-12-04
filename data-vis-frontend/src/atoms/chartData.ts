import { atom, selector } from "recoil"
import { getChartData } from "../utils/getChartData"

export const chartData = selector({
    key: 'ChartData',
    get: async () => {
        return await getChartData()
    }    
})

export const filteredData = atom<any>({
    key: 'FilterdData',
    default : []
})