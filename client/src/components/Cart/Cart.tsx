import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../Home/HomePage';
import Button from '@material-ui/core/Button';
import {
  CreateCheckoutMutation,
} from "../../api/checkout-mutation";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
    const [createCheckout] = CreateCheckoutMutation();

    // const Registration = async () => {
    //   try {
    //     await createCheckout({
    //       variables: {
    //         address: "caokynhat",
    //         amount: 12000,
    //         product: [
    //           {
    //             name: 'tivi',
    //             price: 1000,
    //             quantity: 2,
    //             totalprice: 2000
    //           },
    //           {
    //             name: 'ssse dap',
    //             price: 1000,
    //             quantity: 2,
    //             totalprice: 2000
    //           }
    //         ],
    //       },
    //     }).then(data => {
    //       console.log("data", data);
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

  const handleCheckout = async (items: CartItemType[]) => {
    console.log("product", items);
    console.log("total", calculateTotal(items).toFixed(2))
    // console.log("totalprive", (item.amount * item.price).toFixed(2));
    let arrFormatItems = [] as any;
    let object = {};
    if( items.length > 0) {
      items.forEach(element => {
        // object = {
        //   name: element?.name,
        //   price: parseInt(element?.price),
        //   quantity: element.amount,
        //   totalprice: parseInt((element.amount * element.price).toFixed(2))
        // }
  
        // arrFormatItems.push(object);
      });
    }
  
    
    await createCheckout({
      variables: {
        address: "caokynhat",
        amount: parseInt(calculateTotal(items).toFixed(2)),
        product: arrFormatItems,
      },
    }).then(data => {
      console.log("data", data);
    });
  };

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          size='large'
          disableElevation
          variant='contained'
          onClick={() => handleCheckout(cartItems)}
        >
          Thanh toán
        </Button>
      </div>
    </Wrapper>
  );
};

export default Cart;
