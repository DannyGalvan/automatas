import { useFileReader } from "../../hooks/useFileReader"
import { useFileContentStore } from "../../stores/useFileContentStore";
import { useVectorStore } from "../../stores/useVectorStore";
import { DropZone } from "../pure/DropZone";

export const FileUploader = () => {
  const {getInputProps, getRootProps, isDragActive} = useFileReader();
  const {fileContent} = useFileContentStore();
  const {errors} = useVectorStore();

  return (
    <div className='w-full py-5 px-10'>
        <h1 className='text-xl font-bold pb-2'>Carga de archivo TXT</h1>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropZone isDragActive={isDragActive} isFileContent={fileContent != ""} isError={errors.length > 0} />
        </div>
      </div>
  )
}
