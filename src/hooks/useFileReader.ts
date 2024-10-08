import { useCallback } from "react";
import { TransformVariables } from "../utils/TransformVariables";
import { useVectorStore } from "../stores/useVectorStore";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { fileTypes } from "../config/constants";
import { useFileContentStore } from "../stores/useFileContentStore";

export const useFileReader = () => {
    const { fileContent, setFileContent, setA, setQ, setI, setZ, setW } = useFileContentStore();
    const { setAArray, setQArray, setZArray, setWArray } = useVectorStore();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => toast.error('Se canceló la lectura del archivo')
            reader.onerror = () => console.log('Error al leer el archivo')
            reader.onload = () => {
                setFileContent(reader.result);

                const content = reader.result; // Obtener el contenido del archivo

                if (content !== undefined && typeof content === "string" && content !== "") {
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
                } else {
                    toast.error("Error al cargar el archivo contenido invalido revise porfavor");
                }
            }
            reader.readAsText(file)
        })
    }, [setA, setAArray, setFileContent, setI, setQ, setQArray, setW, setWArray, setZ, setZArray]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: fileTypes, disabled: fileContent !== "", multiple: false,
    });

    return { getRootProps, getInputProps, isDragActive };
}
