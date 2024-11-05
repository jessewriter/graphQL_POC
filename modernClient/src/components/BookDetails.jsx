import { request } from 'graphql-request'
import { getBookQuery } from '../queries/queries'
import { useQuery } from '@tanstack/react-query'

export const BookDetails = ({ bookId }) => {

    const bookQuery = useQuery({
        queryKey: ['book', bookId],
        queryFn: async () => request('http://localhost:4000/graphql', getBookQuery, { id: bookId }),
        enabled: !!bookId
    })

    const displayBookDetails = () => {
        if (bookQuery.data?.book) {
            const book = bookQuery.data.book
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return (<div>No book selected...</div>)
        }
    }
    return (
        <div id="book-details">
            {displayBookDetails()}
        </div>
    )
}

