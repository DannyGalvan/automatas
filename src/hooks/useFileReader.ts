import { useCallback } from "react";
import { TransformVariables } from "../utils/TransformVariables";
import { useVectorStore } from "../stores/useVectorStore";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { fileTypes, VectorVariables } from "../config/constants";
import { useFileContentStore } from "../stores/useFileContentStore";

export const useFileReader = () => {
    const { fileContent, setFileContent, setA, setQ, setI, setZ, setW } = useFileContentStore();
    const { setAArray, setQArray, setZArray, setWArray, addErrors, setErrors } = useVectorStore();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => toast.error('Se canceló la lectura del archivo')
            reader.onerror = () => toast.error('Error al leer el archivo')
            reader.onload = () => {
                setFileContent(reader.result);
                setErrors([]);
                const content = reader.result; // Obtener el contenido del archivo

                if (content !== undefined && typeof content === "string" && content !== "") {
                    const lines = content.split("\n").sort(); // Dividir el contenido en líneas y ordenarlas

                    // Filtrar las líneas que no estén vacías
                    const linesFiltered = lines.filter((line) => {
                        const [variable, value] = line.split("=");
                        return VectorVariables.has(variable.trim()) && value.trim() !== "";
                    });

                    // Asignar cada línea a una variable según el orden
                    if (linesFiltered.length >= 5) {
                        const aLine = linesFiltered[0].trim();
                        setA(aLine);
                        setAArray(TransformVariables.transformVector(aLine, "A", addErrors));
                        const qLine = linesFiltered[1].trim();
                        setQ(qLine);
                        setQArray(TransformVariables.transformVector(qLine, "Q", addErrors));
                        const wLine = linesFiltered[2].trim();
                        setW(wLine);
                        setWArray(TransformVariables.transformMatrix(TransformVariables.transformVector(wLine, "W", addErrors, ";"), addErrors));
                        const zLine = linesFiltered[3].trim();
                        setZ(zLine);
                        setZArray(TransformVariables.transformVector(zLine, "Z", addErrors));
                        setI(linesFiltered[4].trim());

                        toast.success("Archivo cargado correctamente");
                    } else {
                        toast.error(`El archivo no contiene la cantidad de variables necesarias, 
                                     se encontraron ${linesFiltered.length} variables de 5, 
                                     variables encontradas: ${linesFiltered.map((line) => line.split("=")[0]).join(", ")},
                                     falta: ${Array.from(VectorVariables).filter((variable) => !linesFiltered.map((line) => line.split("=")[0].trim()).includes(variable)).join(", ")}`);

                        addErrors({
                            Contenido: `El archivo no contiene la cantidad de variables necesarias`,
                        });
                        addErrors({
                            Cantidad: `Se encontraron ${linesFiltered.length} variables de 5`,
                        });
                        addErrors({
                            Encontradas: linesFiltered.map((line) => line.split("=")[0]).join(", "),
                        });
                        addErrors({
                            Faltantes: Array.from(VectorVariables).filter((variable) => !linesFiltered.map((line) => line.split("=")[0].trim()).includes(variable)).join(", "),
                        });
                        addErrors({
                            Formato: `${Array.from(VectorVariables).map((variable) => `${variable} = {...}`).join("\n")}`,
                        });
                    }
                } else {
                    addErrors({ FileContent: "Error al cargar el archivo, archivo vacío" });
                    toast.error("Error al cargar el archivo, archivo vacío");
                }
            }
            reader.readAsText(file)
        })
    }, [setA, setAArray, setFileContent, setI, setQ, setQArray, setW, setWArray, setZ, setZArray, addErrors, setErrors]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: fileTypes, disabled: fileContent !== "", multiple: false,
    });

    return { getRootProps, getInputProps, isDragActive };
}
