import { useState } from 'react'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { request } from 'graphql-request'

export const AddBook = () => {
    const uri = 'http://localhost:4000/graphql'

    const queryClient = useQueryClient()

    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [author, setAuthor] = useState('')

    const { isLoading, data } = useQuery({
        queryKey: ['authors'],
        queryFn: async () => request(uri, getAuthorsQuery),
    })

    const displayAuthors = () => {
        if (isLoading) {
            return (<option disabled>Loading authors</option>)
        } else if (data?.authors) {
            return data?.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        } else {
            <div>No authors</div>
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()
        // use the addBookMutation
        await request(uri, addBookMutation, {
            name: name,
            genre: genre,
            authorId: author
        })
        queryClient.invalidateQueries({ queryKey: ['books'], refetchType: 'all' }) // by invalidating this query it will force an update of BookList get books query and update the list
    }

    return (
        <form id="add-book" onSubmit={submitForm.bind(this)} >
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthor(e.target.value)} >
                    <option disabled={author} value=' Select author'>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

