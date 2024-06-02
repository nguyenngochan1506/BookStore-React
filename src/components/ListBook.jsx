import SingleBook from "./SingleBook"

const ListBook = ({listBook}) => {
    
  return (
        <div className=" p-8 pt-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" id="best-sale">
            {
                listBook.map((book) => {
                    return <SingleBook key={book.id} book={book}/>
                })
            }
        </div>
  )
}

export default ListBook