import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import getUID from './Util';
import useLocalStorage from "./useLocalStorage";
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";
import EditNote from "./EditNote";



export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}
export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}
export type Tag = {
  id: string
  label: string
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("Notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => { return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) } })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNote => { return [...prevNote, { ...data, tagIds: tags.map(tag => tag.id), id: getUID() }] })
  }
  const onEditNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNote => {
      return prevNote.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }
  const onDeleteNote = (id: string) => {
    setNotes(prevNote => {
      let t = prevNote.filter(note => note.id !== id);
      return t
    })
  }
  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }
  const onEditTag = (id: string, label: string) => {
    setTags(prevTag => {
      return prevTag.map(tag => {
        if (tag.id === id) {
          return { ...tag , label }
        } else {
          return tag
        }
      })
    })
  }
  const onDeleteTag = (id: string) => {
    setTags(prevTag => prevTag.filter(tag => tag.id !== id))
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList onEditTag={onEditTag} onDeleteTag={onDeleteTag} availableTags={tags} notes={notesWithTags} />} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={tags} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />} >
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route path="edit" element={<EditNote onSubmit={onEditNote} onAddTag={onAddTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>

  )
}

export default App
