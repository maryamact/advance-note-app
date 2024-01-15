import { Card, Stack, Col, Badge } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { SimplifiedNote } from './NoteList';
import styles from "./NoteCard.module.css"

type NoteCardProps = {
    note: SimplifiedNote
}
export default function NoteCard({ note }: NoteCardProps) {
    return (
        <Col>
            <Card as={Link} to={`/${note.id}`}
                className={`${styles.card} text-reset h-100 text-decoration-none align-items-center justify-content-center fs-5 `}>
                <Card.Body>
                    <Stack gap={2}>
                        <span>{note.title}</span>
                        {note.tags.length > 0 && note.tags.map(tag => {
                            return <Stack key={tag.id} className='justify-content-center flex-wrap' gap={2} direction='horizontal'>
                                <Badge className='text-truncate'>{tag.label}</Badge>
                            </Stack>
                        })}
                    </Stack>
                </Card.Body>
            </Card>
        </Col>
    )
}
