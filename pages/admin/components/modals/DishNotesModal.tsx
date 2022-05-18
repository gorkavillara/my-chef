import React, { useState } from "react"
import { IoSave, IoTrashBin } from "react-icons/io5"
import {
    updateDishNotes,
} from "../../../../controllers/DBController"
import { Booking, Dish, Note } from "../../../../models"
import Input from "../forms/Input"

const tags = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

const DishNotesModal = ({
    notes = {
        text: "",
        tags: [],
    },
    booking,
    dish,
    closeModal,
    status = "new",
}: {
    notes?: Note
    booking: Booking
    dish: Dish
    closeModal: Function
    status: string
}) => {
    const [newNotes, setNewNotes] = useState<Note>(notes)
    const [noteTags, setNoteTags] = useState(notes.tags)

    const toggleTag = (tag: string) => {
        let allTags = []
        if (noteTags.includes(tag)) {
            allTags = noteTags.filter((allTags) => allTags !== tag)
        } else {
            allTags = [...noteTags, tag]
        }
        setNoteTags([...allTags])
        setNewNotes({ text: newNotes.text, tags: [...allTags] })
    }
    const saveNote = () => {
        const dishNotes =
            status === "new"
                ? dish.notes
                    ? [...dish.notes, newNotes]
                    : [newNotes]
                : dish.notes.map((note) =>
                      note.text === notes.text &&
                      note.tags.every((t, i) => t === notes.tags[i])
                          ? newNotes
                          : note
                  )
        const newDish = {
            ...dish,
            notes: dishNotes,
        }
        return updateDishNotes({
            dish: newDish,
            booking,
        })
            .catch((e) => console.log(e))
            .finally(() => closeModal())
    }
    const deleteNote = () => {
        const res = confirm("Are you sure?")
        if (!res) return
        if (status === "new") {
            return closeModal()
        }
        const newDish = {
            ...dish,
            notes: dish.notes.filter(
                (note) =>
                    !(
                        note.text === notes.text &&
                        note.tags.every((t, i) => t === notes.tags[i])
                    )
            ),
        }
        return updateDishNotes({
            dish: newDish,
            booking,
        })
            .catch((e) => console.log(e))
            .finally(() => closeModal())
    }
    return booking ? (
        <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-lg">Notes</h1>
            <input
                value={newNotes.text}
                onChange={(e) =>
                    setNewNotes({ text: e.target.value, tags: noteTags })
                }
                className="input-text"
                autoFocus={false}
            />
            <div className="w-full border-t"></div>
            <h1 className="font-semibold text-lg">Tags</h1>
            <Input
                type="chip-select-lg"
                name="Select tags for this note"
                placeholder="tags"
                value={noteTags}
                options={tags}
                containerClassName="col-span-2"
                onChange={(e: string) => toggleTag(e)}
            />
            <div className="flex justify-end gap-4 flex-wrap">
                <button className="btn-secondary-red" onClick={deleteNote}>
                    <IoTrashBin />
                    Delete Note
                </button>
                <button className="btn-primary-green" onClick={saveNote}>
                    <IoSave />
                    Save
                </button>
            </div>
        </div>
    ) : null
}

export default DishNotesModal
