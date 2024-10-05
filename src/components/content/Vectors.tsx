import { useVectorStore } from "../../stores/useVectorStore"
import { Col } from "../grid/Col"
import { VectorItem } from "../pure/VectorItem"


export const Vectors = () => {
    const { aArray, qArray, zArray } = useVectorStore()
    return (
        <Col md={6} >
            <h3 className='font-bold'>Vectores</h3>
            <hr className='border-2 border-black' />
            <section className='flex flex-row mt-5'>
                <VectorItem data={qArray} title='Q' />
                <VectorItem data={zArray} title='Z' />
                <VectorItem data={aArray} title='A' />
            </section>
        </Col>
    )
}
