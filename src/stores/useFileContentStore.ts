import { create } from "zustand";

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
}

export const useFileContentStore = create<FileContentStore>((set) => ({
    fileContent: "",
    Q: "",
    Z: "",
    i: "",
    A: "",
    W: "",
    setQ: (Q) => set({ Q }),
    setZ: (Z) => set({ Z }),
    setI: (i) => set({ i }),
    setA: (A) => set({ A }),
    setW: (W) => set({ W }),
    setFileContent: (fileContent) => set({ fileContent }),
    clearContent: () => set({ fileContent: "", Q: "", Z: "", i: "", A: "", W: "" }),
}));