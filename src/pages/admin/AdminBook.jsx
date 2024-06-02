import { SideBar } from "../../components";

const AdminBook = () => {
    const book = {
        id:'1',
        bookName: 'Tôi tài giỏi, bạn cũng thế',
        authors:'Adam K...',
        isbn:'012345657',
        categories:'Hành Động, tiểu thuyết, giật gân',
        num:'12',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam voluptates modi quaerat id sit in aliquid praesentium ad doloribus, minus eligendi iste, rem saepe veritatis sint at laboriosam cumque alias!'
    }
    const showDetail = (book) => {
        document.querySelector('#modal-detail').showModal();
            document.querySelector('#modal-box-detail').innerHTML = `
            <h3 class="font-bold text-xl capitalize">Thông tin chi tiết <strong>#${book.id}</strong></h3>
                <ul class="py-4">
                    <li>-Tên Sách: <strong>${book.bookName}</strong></li>
                    <li>-Mã Số Tiêu Chuẩn: <strong>${book.isbn}</strong></li>
                    <li>-Thể Loại: <strong>${book.categories}</strong></li>
                    <li>-Tác Giả: <strong>${book.authors}</strong></li>
                    <li>-Số Trang: <strong>${book.num}</strong></li>
                    <li>-Mô Tả: <strong>${book.description}</strong></li>
                </ul>   
            </div>`

    }
  return (
    <>
      <div className="grid grid-cols-9 ">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="md:col-span-7 col-span-9">
            <div className="border rounded-md h-full shadow-md container mx-auto p-8">
                <h2 className="capitalize mb-8 tracking-wider text-2xl font-bold text-center">quản lý người dùng</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th>Mã Sách</th>
                                <th className="max-h-[4em]">Tên sách</th>
                                <th className="hidden md:block ">Thể Loại</th>
                                <th>Tác Giả</th>
                                <th className="hidden md:block">Mã Số Tiêu Chuẩn</th>
                                <th>Số Lượng</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#01</td>
                                <td className="span">Tôi tài giỏi, bạn cũng thế</td>
                                <td className="hidden md:block mt-1">hành động, kinh dị, giật gân</td>
                                <td>Adam K...</td>
                                <td className="hidden md:block">012345657</td>
                                <td>12</td>
                                <td className="whitespace-nowrap">
                                    <button className="btn btn-warning btn-sm" onClick={()=>showDetail(book)}>Chi
                                        Tiết</button>
                                    <button className="btn btn-success btn-sm" onClick={()=>showModalEdit(book)}>Chỉnh Sửa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
      {/* <!-- modal chi tiet --> */}
    <dialog id="modal-detail" className="modal">
        <div className="modal-box" id="modal-box-detail">

        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
    </>
  );
}

export default AdminBook