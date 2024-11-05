import { useState } from 'react'
import { request } from 'graphql-request'
import { getBooksQuery } from '../queries/queries'
import { BookDetails } from './BookDetails'
import { useQuery } from '@tanstack/react-query'

export const BookList = () => {
    const [selected, setSelected] = useState(null)

    const booksQuery = useQuery({
        queryKey: ['books'],
        queryFn: async () => request('http://localhost:4000/graphql', getBooksQuery)
    })

    console.log('booksQuery.data', booksQuery.data)

    const displayBooks = () => {
        if (booksQuery.loading) {
            return (<div>Loading books...</div>)
        } else if (booksQuery.data && booksQuery.data.books?.length > 0) {
            return booksQuery.data.books.map(book => {
                return (
                    <li key={book.id} onClick={(e) => setSelected(book.id)}>{book.name}</li>
                )
            })
        } else {
            <div>No books in db</div>
        }
    }
    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    )
}

