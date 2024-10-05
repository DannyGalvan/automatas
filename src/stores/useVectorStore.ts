import { create } from "zustand";
import { Matrix } from "../types/Matris";

interface VectorStore {
    qArray: string[];
    zArray: string[];
    aArray: string[];
    wArray: Matrix[];
    setQArray: (qArray: string[]) => void;
    setZArray: (zArray: string[]) => void;
    setAArray: (aArray: string[]) => void;
    setWArray: (wArray: Matrix[]) => void;
    getValueForCell: (from: string, symbol: string) => string;
    clear: () => void;
}

export const useVectorStore = create<VectorStore>((set, get) => ({
    qArray: [],
    zArray: [],
    aArray: [],
    wArray: [],
    setQArray: (qArray) => set({ qArray }),
    setZArray: (zArray) => set({ zArray }),
    setAArray: (aArray) => set({ aArray }),
    setWArray: (wArray) => set({ wArray }),
    getValueForCell: (row, col) => {
        const transitions = get().wArray.filter(
            (item) => item.from === row && item.symbol === col
        );

        // Si hay más de un valor para la misma celda, concatenar con comas
        if (transitions.length > 0) {
            return transitions.map((item) => item.to).join(", ");
        }
        return "";
    },
    clear: () => set({ qArray: [], zArray: [], aArray: [], wArray: [] }),
}));