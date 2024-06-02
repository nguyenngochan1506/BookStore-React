import { SideBar } from "../../components";

const AdminUser = () => {
    // [1, 'Nguyễn Ngọc Hân', '123@gmail.com', 'ADMIN, EMPLOYEE USER', 12345678, 'Hồ Chí Minh, Thủ Đức, Bình Dương', 'Đã kích hoạt']
    const user ={
        id: 1,
        name: 'Nguyễn Ngọc Hân',
        email: '123@gmail.com',
        roles: 'ADMIN, EMPLOYEE USER',
        phone: 12345678,
        address: 'Hồ Chí Minh, Thủ Đức, Bình Dương',
        isActive: 'Đã kích hoạt',
    }
    const showDetail = (user) => {
        document.querySelector('#modal-detail').showModal();
        document.querySelector('#modal-box-detail').innerHTML = `
        <h3 class="font-bold text-xl capitalize">Thông tin chi tiết <strong>#${user.id}</strong></h3>
            <ul class="py-4">
                <li>-Tên Người Dùng: <strong>${user.name}</strong></li>
                <li>-Email: <strong>${user.email}</strong></li>
                <li>-Quyền: <strong>${user.roles}</strong></li>
                <li>-SĐT: <strong>${user.phone}</strong></li>
                <li>-Địa Chỉ: <strong>${user.address}</strong></li>
                <li>-Trạng Thái: <strong>${user.isActive}</strong></li>
            </ul>   
        </div>
        `;

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
                                <th>Mã KH</th>
                                <th>Tên Người Dùng</th>
                                <th>Email</th>
                                <th className="hidden md:block">Quyền</th>
                                <th>Trạng Thái</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#01</td>
                                <td>Nguyễn Ngọc Hân</td>
                                <td>123@gmail.com</td>
                                <td className="uppercase hidden md:block pt-5">admin, employee, user</td>
                                <td>Đã Kích Hoạt</td>
                                <td className="whitespace-nowrap">
                                    <button className="btn btn-warning btn-sm"
                                        onClick={()=>showDetail(user)}>Chi
                                        Tiết</button>
                                    <button className="btn btn-success btn-sm">Chỉnh Sửa</button>
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
};

export default AdminUser;
