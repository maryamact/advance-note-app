import React, { useRef, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from './App';
import getUID from './Util';


type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
} & Partial<NoteData> 

export default function NoteForm({  title= "", markdown= "", tags= [] , onSubmit, onAddTag, availableTags }: NoteFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            onSubmit({
                title: formRef.current.title.value,
                markdown: formRef.current.markdown.value,
                tags: selectedTags
            })
            navigate("..");
        }

    }
    return (
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required defaultValue={title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tag'>
                            <Form.Label>Tag</Form.Label>
                            <CreatableReactSelect
                                onCreateOption={label => {
                                    const newTag = { id: getUID(), label: label }
                                    onAddTag(newTag);
                                    setSelectedTags(prev => [...prev, newTag])
                                }}
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
                <Row>
                    <Form.Group controlId='markdown'>
                        <Form.Label>Body</Form.Label>
                        <Form.Control defaultValue={markdown} as={"textarea"} required rows={15} />
                    </Form.Group>
                </Row>
                <Stack gap={2} direction='horizontal' className='justify-content-end'>
                    <Button type='submit'>Save</Button>
                    <Link to="..">
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>

                </Stack>
            </Stack>
        </Form>
    )
}
