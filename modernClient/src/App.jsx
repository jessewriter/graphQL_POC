// import { getBooksQuery } from 'queries/queries'
import './App.css'
import { BookList } from './components/BookList'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AddBook } from './components/AddBook'

function App() {

  // Create a client
  const queryClient = new QueryClient() // for app root, call using useQueryClient inside components!

  return (
    <QueryClientProvider client={queryClient}>
      <h1>Book List</h1>
      <div id="main">
        <BookList />
        <AddBook />
      </div>

    </QueryClientProvider>
  )
}

export default App
