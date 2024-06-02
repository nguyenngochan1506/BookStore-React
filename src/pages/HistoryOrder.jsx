import { BsFillCartFill } from "react-icons/bs";
import { useLoaderData } from "react-router-dom"
import { dinhDangTien } from "../until";

export const loader = () =>{
 return JSON.parse(localStorage.getItem('orderHistory'));
}


const HistoryOrder = () => {
    const listOrder = useLoaderData();


  return (
    <div className="mb-8 mt-16 container mx-auto">
        <div className="text-2xl text-center">Lịch Sử Đơn Hàng</div>
        <div className="overflow-x-auto">
        {listOrder 
        ? <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>Ngày Đặt</th>
            <th>Số Lượng Đặt</th>
            <th>Giá</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            listOrder.map(o=>{
                return <tr key={o.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                        <BsFillCartFill className="size-12"/>
                    </div>
                    <div>
                      <div className="font-bold">{o.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {o.createdDate    }
                </td>
                <td>{o.listOrderDetails.length}</td>
                <td>{dinhDangTien(o.total)}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">{o.state.name}</button>
                </th>
              </tr>
            })
          }
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
        
      </table>
    :<div className="text-center text-xl mt-16">Lịch Sử Trống</div>
    }
</div>
    </div>
  )
}

export default HistoryOrder