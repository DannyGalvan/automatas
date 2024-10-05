import { ChangeEvent, useState } from "react";
import { TransformVariables } from "../utils/TransformVariables";
import { useVectorStore } from "../stores/useVectorStore";
import { toast } from "react-toastify";

export const useFileReader = () => {
    const [fileContent, setFileContent] = useState<string | ArrayBuffer | null | undefined>("");
    const [Q, setQ] = useState("");
    const [Z, setZ] = useState("");
    const [i, setI] = useState("");
    const [A, setA] = useState("");
    const [W, setW] = useState("");
    const { setAArray, setQArray, setZArray, setWArray, clear } = useVectorStore();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        if (files !== undefined) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // El contenido del archivo se carga aquí
                setFileContent(e.target?.result); // Asigna el contenido del archivo al estado

                const content = e.target?.result; // Obtener el contenido del archivo

                if (content !== undefined && typeof content === "string") {
                    const lines = content.split("\n"); // Dividir el contenido en líneas

                    // Asignar cada línea a una variable según el orden
                    if (lines.length >= 5) {
                        const qLine = lines[0].trim();
                        setQ(qLine);
                        setQArray(TransformVariables.transformVector(qLine, "Q"));
                        const zLine = lines[1].trim();
                        setZ(zLine);
                        setZArray(TransformVariables.transformVector(zLine, "Z"));
                        setI(lines[2].trim());
                        const aLine = lines[3].trim();
                        setA(aLine);
                        setAArray(TransformVariables.transformVector(aLine, "A"));
                        const wLine = lines[4].trim();
                        setW(wLine);
                        setWArray(TransformVariables.transformMatrix(TransformVariables.transformVector(wLine, "W", ";")));

                        toast.success("Archivo cargado correctamente");
                    }
                }else{
                    toast.error("Error al cargar el archivo seleccionado contenido invalido revise porfavor");
                }
            };

            reader.readAsText(files![0]); // Lee el contenido del archivo
        }
    };

    const handleClear = () => {
        setFileContent("");
        setQ("");
        setZ("");
        setI("");
        setA("");
        setW("");
        clear();
        toast.info("Contenido limpiado");
    }

    return { fileContent, handleFileChange, Q, Z, i, A, W, handleClear };
}
