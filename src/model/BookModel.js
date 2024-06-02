import dayjs from "dayjs";

export default class BookModel {
    constructor({id, title, listAuthors, isbn, numberPages, coverType, description, price, publisher, publicationDate, listCategories, listImage, inventory = 0}){
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.numberPages = numberPages;
        this.coverType = coverType;
        this.description = description;
        this.price = price;
        this.publicationDate = publicationDate;
        this.publisher = publisher;
        this.listCategories = listCategories;
        this.listImage = listImage;
        this.listAuthors = listAuthors;
        this.listRating = [];
        this.inventory = inventory;
    }
    addCategories(category){
        this.listCategories.push(category);
    }
    removeCategory(category){
        this.listCategories.filter(cate => category != cate);
    }
    addImage(image){
        this.listImage.push(image);
    }
    addAuthor(author){
        this.listAuthors.push(author)
    }
    addRating(rating){
        this.listRating.push(rating);
    }
}