
import { Col } from '../grid/Col'
import { useVectorStore } from '../../stores/useVectorStore'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'

export const Arrays = () => {
    const { qArray, zArray, getValueForCell } = useVectorStore()

    const tableHeader = [
        <TableColumn key="header-esta" className='font-bold text-lg'>Esta</TableColumn>, // Columna fija
        ...zArray.map((column, index) => (
            <TableColumn className='font-bold text-lg' key={`header-${index}`}>{column}</TableColumn>
        ))
    ];

    const tableBody = qArray.map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
            {[
                <TableCell key={`row-header-${rowIndex}`} className='font-bold text-lg'>{row}</TableCell>, // Celda fija de la fila
                ...zArray.map((column, colIndex) => (
                    <TableCell className='text-lg' key={`cell-${rowIndex}-${colIndex}`}>
                        {getValueForCell(row, column)}
                    </TableCell>
                ))
            ]}
        </TableRow>
    ));

    return (
        <Col md={6} className='pb-5'>
            <h3 className='font-bold'>Matriz</h3>
            <hr className='border-2 border-black' />
            <section className='mt-5'>
                {qArray.length > 0 && zArray.length > 0 && (
                    <Table aria-label="Matriz de tranciciones">
                        <TableHeader>
                            {tableHeader}
                        </TableHeader>
                        <TableBody>
                            {tableBody}
                        </TableBody>
                    </Table>
                )}
            </section>
        </Col>
    )
}

