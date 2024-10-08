import { AiFillFileText } from "react-icons/ai";
import { RiFileAddLine, RiFileCloudLine } from "react-icons/ri";

interface DropZoneProps {
    isDragActive: boolean;
    isFileContent: boolean;
}

export const DropZone = ({ isDragActive, isFileContent }: DropZoneProps) => {
    return (
        !isFileContent ?
            (<section className='border-3 border-gray-300 border-dashed p-4'>
                {
                    isDragActive ?
                        <article className="flex gap-4 justify-center items-center">
                            <RiFileAddLine className="text-gray-600" size={35} />
                            <p>Suelta el archivo aquí...</p>
                        </article> :
                        <article className="flex gap-4 justify-center items-center">
                            <AiFillFileText className="text-gray-600" size={35} />
                            <p>Arrastre y suelte algún .txt aquí o haga clic para seleccionarlo</p>
                        </article>
                }
            </section>) :
            (<section>
                <article className="flex gap-4 justify-center items-center">
                    <RiFileCloudLine size={35} className="text-gray-600" />
                    <p className="text-2xl font-bold underline">Archivo cargado correctamente</p>
                </article>
            </section>)
    )
}

