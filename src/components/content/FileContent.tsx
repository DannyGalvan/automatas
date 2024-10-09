import { Button } from '@nextui-org/button'
import { useFileContentStore } from '../../stores/useFileContentStore'
import { useVectorStore } from '../../stores/useVectorStore';
import { toast } from 'react-toastify';

export const FileContent = () => {
    const { fileContent, clearContent } = useFileContentStore();
    const { clear, errors } = useVectorStore();

    const handleClear = () => {
        clearContent();
        clear();
        toast.info("Contenido limpiado");
    }

    return (
        <div className='px-10 flex flex-col justify-center'>
            <section className='flex flex-row gap-4'>
                <h2 className='text-xl font-bold'>Despliege del archivo</h2>
                {
                    fileContent &&
                    (<Button
                        className='bg-gray-500 text-white font-bold'
                        size='sm'
                        onClick={handleClear}>
                        Limpiar
                    </Button>)
                }
            </section>
            <div className='mt-5 p-3 border-3 border-dashed border-gray-300 overflow-x-hidden overflow-y-auto h-[20vh]'>
                <pre>{errors.length === 0 ? 
                      (fileContent as string).trim() : 
                      (<ul>                            
                            {errors.map((error, index) => 
                                <li key={index}>{Object.keys(error).map((key) => `${key}: ${error[key]}`).join(", ")}</li>)}
                            <li>Texto: <br/>{(fileContent as string).trim()}</li>                                
                      </ul>)}
               </pre>
            </div>
        </div>
    )
}

