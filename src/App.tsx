import { Input } from '@nextui-org/input'
import { useFileReader } from './hooks/useFileReader'
import { Row } from './components/grid/Row'
import { Vectors } from './components/content/Vectors'
import { Arrays } from './components/content/Arrays'
import { Button } from '@nextui-org/button'
import { useRef } from 'react'

function App() {
  const ref = useRef<HTMLFormElement>(null);
  const { fileContent, handleFileChange, handleClear } = useFileReader()

  const clearContent = () => {
    handleClear()
    if (ref.current) {
      ref.current.reset()      
    }
  }

  return (
    <form ref={ref} className='main-content overflow-x-hidden'>
      <div className='w-full bg-white py-5 px-10'>
        <h1 className='text-xl font-bold'>Carga de Archvo TXT</h1>
        <Input placeholder='Seleccione archivo para cargar...' accept='.txt' type='file' onChange={handleFileChange} variant='underlined' />
      </div>
      <div className='px-10 flex flex-col justify-center'>
        <section className='flex flex-row gap-4'>
          <h2 className='text-2xl font-bold'>Despliege del archivo</h2>
          <Button className='bg-gray-500 text-white font-bold' size='sm' onClick={clearContent}>Limpiar</Button>
        </section>
        <div className='mt-5 p-3 border-3 border-black overflow-x-hidden overflow-y-auto h-[30vh]'>
          <pre>{fileContent as string}</pre>
        </div>
      </div>
      <Row className='px-10 mt-3 h-[45vh] overflow-x-hidden overflow-y-auto'>
        <Vectors />
        <Arrays />
      </Row>
    </form>
  )
}

export default App
