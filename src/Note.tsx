import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { useNote } from "./NoteLayout"
import ReactMarkdown from "react-markdown"
import { useNavigate } from "react-router-dom";

type NoteProps = {
    onDeleteNote: (id: string) => void;
}

export default function Note({ onDeleteNote }: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    <Stack className='justify-content-start flex-wrap' gap={2} direction='horizontal'>
                        {note.tags.length > 0 && note.tags.map(tag =>
                            <Badge key={tag.id} className='text-truncate'>{tag.label}</Badge>
                        )}ّ
                    </Stack>
                </Col>
                <Col xs="auto">
                    <Stack gap={1} direction="horizontal">
                        <Button variant="primary" href={`/${note.id}/edit`}>Edit</Button>
                        <Button variant="outline-danger" onClick={() => {
                            onDeleteNote(note.id);
                            navigate("/");
                        }}>Delete</Button>
                        <Button variant="outline-secondary" href="..">Back</Button>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}