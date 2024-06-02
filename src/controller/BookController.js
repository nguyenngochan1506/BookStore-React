import { BookData } from "../database"

export const getAllBook = ({viTriHienTai, soLuongLay})=>{
    const result = BookData.slice(viTriHienTai, soLuongLay);
    return result;
}

export const getBookById = (id) =>{
    const result = BookData.find(book => book.id === id);
    return result;
}

export const searchBook = async (input) =>{
    if(!input) return []
    await new Promise(resolve => setTimeout(resolve, 1000))
    const lower = input.toLowerCase();
    console.log(input);
    const result = [];
    BookData.map(b => {
        if(b.title.toLowerCase().includes(lower) || b.publisher.toLowerCase().includes(lower) || b.isbn.toLowerCase().includes(lower) ||  b.description.toLowerCase().includes(lower) ){
            result.push(b);
        }
    })
    return result;
}