import { useState, useMemo } from 'react'
import { Form, Stack, Row, Col, Button, Badge } from "react-bootstrap";
import ReactSelect from 'react-select'
import { Tag } from './App';
import NoteCard from './NoteCard';
import EditTagsModal from './EditTagsModal';

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
    onEditTag: (id: string, label: string) => void
    onDeleteTag: (id: string) => void
}
export type SimplifiedNote = {
    id: string;
    title: string;
    tags: Tag[];
}

export default function NoteList({ onEditTag, onDeleteTag, availableTags, notes }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)

    const filteredNote = useMemo(() => {
        return notes.filter((note) => {
            return (title === "" || note.title.toLocaleLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag =>
                    note.tags.some(noteTag => noteTag.id === tag.id)
                ))
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Note List</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction='horizontal'>
                        <Button variant="primary" href="/new">Create</Button>
                        <Button variant="outline-secondary" onClick={() => setShow(true)}>Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Stack gap={4}>
                    <Row>
                        <Col>
                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='tag'>
                                <Form.Label>Tag</Form.Label>
                                <ReactSelect
                                    options={availableTags.map(tag => { return { value: tag.id, label: tag.label } })}
                                    // value={selectedTags}
                                    // onChange={(tag) => {debugger; setSelectedTags(tag.map(tag => tag))}}
                                    value={selectedTags.map(tag => {
                                        return { label: tag.label, value: tag.id }
                                    })}
                                    onChange={tags => {
                                        setSelectedTags(
                                            tags.map(tag => {
                                                return { label: tag.label, id: tag.value }
                                            })
                                        )
                                    }}
                                    isMulti />
                            </Form.Group>
                        </Col>
                    </Row>
                </Stack >
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className='g-3 mt-4'>
                {filteredNote.map(note => {
                    return <NoteCard key={note.id} note={note} />
                })}

            </Row>
            <EditTagsModal
                show={show}
                onHide={() => setShow(false)}
                onEditTag={onEditTag}
                onDeleteTag={onDeleteTag}
                availableTags={availableTags} />
        </>
    )
}
