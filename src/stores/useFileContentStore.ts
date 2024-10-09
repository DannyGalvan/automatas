import { create } from "zustand";
import { LocalStoreService } from "../services/localStoreService";
import { StoreKeys } from "../config/constants";

interface FileContentStore {
    fileContent: string | ArrayBuffer | null | undefined;
    Q: string;
    Z: string;
    i: string;
    A: string;
    W: string;
    setQ: (Q: string) => void;
    setZ: (Z: string) => void;
    setI: (i: string) => void;
    setA: (A: string) => void;
    setW: (W: string) => void;
    setFileContent: (fileContent: string | ArrayBuffer | null | undefined) => void;
    clearContent: () => void;
    initContent: () => void;
}

export const useFileContentStore = create<FileContentStore>((set, get) => ({
    fileContent: "",
    Q: "",
    Z: "",
    i: "",
    A: "",
    W: "",
    setQ: (Q) => {
        LocalStoreService.setItem(StoreKeys.FILE_CONTENT, { ...get(), Q });
        set({ Q });
    },
    setZ: (Z) => {
        LocalStoreService.setItem(StoreKeys.FILE_CONTENT, { ...get(), Z });
        set({ Z });
    },
    setI: (i) => {
        LocalStoreService.setItem(StoreKeys.FILE_CONTENT, { ...get(), i });
        set({ i });
    },
    setA: (A) => {
        LocalStoreService.setItem(StoreKeys.FILE_CONTENT, { ...get(), A });
        set({ A });
    },
    setW: (W) => {
        LocalStoreService.setItem(StoreKeys.FILE_CONTENT, { ...get(), W });
        set({ W });
    },
    setFileContent: (fileContent) => {
        LocalStoreService.setItem(StoreKeys.FILE_CONTENT, { ...get(), fileContent });
        set({ fileContent });
    },
    clearContent: () => {
        LocalStoreService.setItem(StoreKeys.FILE_CONTENT, { fileContent: "", Q: "", Z: "", i: "", A: "", W: "" });
        set({ fileContent: "", Q: "", Z: "", i: "", A: "", W: "" });
    },
    initContent: () => {
        const content = LocalStoreService.getItem<FileContentStore>(StoreKeys.FILE_CONTENT);
        if (content) {
            set(content);
        }
    }
}));