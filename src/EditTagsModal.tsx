import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "./App"
import { useState } from "react"

type EditTagsModalProps = {
    availableTags: Tag[]
    onEditTag: (id: string, label: string) => void
    onDeleteTag: (id: string) => void
    onHide: () => void
    show: boolean
}

export default function EditTagsModal({ onHide, show, availableTags, onEditTag, onDeleteTag }: EditTagsModalProps) {

    return (
        <Modal onHide={onHide} show={show}>
            <Modal.Header closeButton>
                <Modal.Title> Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => {
                            return <Row key={tag.id}>
                                <Col><Form.Control onChange={(e) => onEditTag(tag.id, e.target.value)} defaultValue={tag.label} /></Col>
                                <Col xs="auto" onClick={() => onDeleteTag(tag.id)}><Button variant="outline-danger">x</Button></Col>
                            </Row>
                        })}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}