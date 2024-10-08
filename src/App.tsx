import { Row } from './components/grid/Row'
import { Vectors } from './components/content/Vectors'
import { Arrays } from './components/content/Arrays'
import { FileContent } from './components/content/FileContent'
import { FileUploader } from './components/content/FileUploader'

function App() {
  
  return (
    <main className='main-content overflow-x-hidden'>
      <FileUploader />
      <FileContent />
      <Row className='px-10 mt-3 h-[53vh] overflow-x-hidden overflow-y-auto'>
        <Vectors />
        <Arrays />
      </Row>
    </main>
  )
}

export default App
