import { dinhDangTien } from "../until";
import CartItemSingle from "./CartItemSingle";

const CartItemList = ({ listCartItems }) => {
  return (
    <>
    {listCartItems.map(i => {
        return <CartItemSingle key={i.id} item={i}/>
    })}
    </>
  );
};

export default CartItemList;
