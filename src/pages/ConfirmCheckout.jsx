import { Link } from "react-router-dom";
import { icon } from "../assets/img";

const ConfirmCheckout = () => {
  return (
    <div>
      <div className="flex justify-center text-2xl breadcrumbs border-b border-base-300 mb-6">
        <ul>
          <li>
            <li>
              <Link to={"/cart"}>Giỏ Hàng</Link>
            </li>
          </li>
          <li>
            <Link to={"/checkout"}>Thanh Toán</Link>
          </li>
          <li className="underline">Xác Nhận</li>
        </ul>
      </div>
      <div className="">
        <div className="text-2xl tracking-tighter font-semibold text-center">
          Đơn hàng của bạn đã được xác nhận!
        </div>
        <div className="text-center flex justify-center translate-x-20 mt-8">
          <img src={icon.confirm} alt="icon" className="size-96" />
        </div>
        <div className="text-center mb-16">
        <Link to={'/' } className="btn btn-primary">
            Về Trang Chủ
        </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCheckout;
