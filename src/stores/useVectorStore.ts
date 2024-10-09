import { create } from "zustand";
import { Matrix } from "../types/Matris";
import { LocalStoreService } from "../services/LocalStoreService";
import { StoreKeys } from "../config/constants";

interface VectorStore {
    qArray: string[];
    zArray: string[];
    aArray: string[];
    wArray: Matrix[];
    errors: Record<string, string>[];
    setQArray: (qArray: string[]) => void;
    setZArray: (zArray: string[]) => void;
    setAArray: (aArray: string[]) => void;
    setWArray: (wArray: Matrix[]) => void;
    addErrors: (errors: Record<string, string>) => void;
    setErrors: (errors: Record<string, string>[]) => void;
    getValueForCell: (from: string, symbol: string) => string;
    clear: () => void;
    initVectors: () => void;
}

export const useVectorStore = create<VectorStore>((set, get) => ({
    qArray: [],
    zArray: [],
    aArray: [],
    wArray: [],
    errors: [],
    setQArray: (qArray) => {
        LocalStoreService.setItem(StoreKeys.VECTOR_CONTENT, { ...get(), qArray });
        set({ qArray });
    },
    setZArray: (zArray) => {
        LocalStoreService.setItem(StoreKeys.VECTOR_CONTENT, { ...get(), zArray });
        set({ zArray });
    },
    setAArray: (aArray) => {
        LocalStoreService.setItem(StoreKeys.VECTOR_CONTENT, { ...get(), aArray });
        set({ aArray });
    },
    setWArray: (wArray) => {
        LocalStoreService.setItem(StoreKeys.VECTOR_CONTENT, { ...get(), wArray });
        set({ wArray });
    },
    addErrors: (errors) => {
        LocalStoreService.setItem(StoreKeys.VECTOR_CONTENT, { ...get(), errors: [...get().errors, errors] });
        set({ errors: [...get().errors, errors] });
    },
    setErrors: (errors) => {
        LocalStoreService.setItem(StoreKeys.VECTOR_CONTENT, { ...get(), errors });
        set({ errors });
    },
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
    clear: () => {
        LocalStoreService.setItem(StoreKeys.VECTOR_CONTENT, {
            qArray: [],
            zArray: [],
            aArray: [],
            wArray: [],
            errors: [],
        });
        set({ qArray: [], zArray: [], aArray: [], wArray: [], errors: [] });
    },
    initVectors: () => {
        const content = LocalStoreService.getItem<VectorStore>(StoreKeys.VECTOR_CONTENT);
        if (content) {
            set(content);
        }
    },
}));