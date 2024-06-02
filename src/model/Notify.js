import dayjs from "dayjs";

export default class Notify{
    constructor(content) {
        this.content = content;
        this.createdDate = dayjs(new Date()).format('DD/MM/YYYY').toString();
    }
}