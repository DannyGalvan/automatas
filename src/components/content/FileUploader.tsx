import { useFileReader } from "../../hooks/useFileReader"
import { useFileContentStore } from "../../stores/useFileContentStore";
import { DropZone } from "../pure/DropZone";

export const FileUploader = () => {
  const {getInputProps, getRootProps, isDragActive} = useFileReader();
  const {fileContent} = useFileContentStore();

  return (
    <div className='w-full py-5 px-10'>
        <h1 className='text-xl font-bold pb-2'>Carga de Archvo TXT</h1>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <DropZone isDragActive={isDragActive} isFileContent={fileContent != ""} />
        </div>
      </div>
  )
}
