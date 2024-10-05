import { Col } from "../grid/Col";

export interface VectorItemProps {
    data: string[];
    title: string;
}

export const VectorItem = ({ data, title }: VectorItemProps) => {
    return (
        <Col md={4} className="flex flex-col items-center">
            <article className="font-bold text-center bg-gray-500 p-5 border-1 w-20 text-white">{title}</article>
            {
                data.map((el, index) => (
                    <article className="border-1 text-center p-5 w-20" key={index}>{el}</article>
                ))
            }
        </Col>
    )
}
