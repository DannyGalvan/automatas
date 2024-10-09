import { toast } from "react-toastify";
import { Matrix } from "../types/Matris";


export class TransformVariables {

    static transformVector(qLine: string, title: string, onError: (errors: Record<string, string>) => void, separator = ","): string[] {
        const match = qLine.match(/\{([^}]+)\}/);
        if (match) {
            return match[1].split(separator).map(el => el.trim());
        } else {
            toast.error(`la variable ${title} no contiene el formato correcto`);
            onError({ [title]: `la variable ${title} no contiene el formato correcto` });
        }
        return [];
    }

    static transformMatrix(matrixArray: string[], onError: (errors: Record<string, string>) => void): Matrix[] {
        let transitions: Matrix[] = [];

        transitions = matrixArray.map(item => {
            const match = item.match(/\(([^,]+),([^,]+),([^)]+)\)/);

            if (!match) {
                toast.error(`la variable W no contiene el formato correcto`);
                onError({ W: `la variable W no contiene el formato correcto` });
            }

            return {
                from: match![1].trim(), // Fila (Q)
                symbol: match![2].trim(), // Columna (Z)
                to: match![3].trim() // Valor de celda
            };
        });

        return transitions;
    }
}