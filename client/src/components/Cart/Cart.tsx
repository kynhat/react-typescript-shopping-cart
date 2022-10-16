import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../Home/HomePage";
import Button from "@material-ui/core/Button";
import { CreateCheckoutMutation } from "../../api/checkout-mutation";
import { CreateCheckoutForguestMutation } from "../../api/checkoutforguest-mutation";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { log } from "console";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

type RegistationCartType = {
  address: string;
  firstname: string;
  amount: number;
  lastName: string;
  phone: number;
  email: string;
};

// const initialState: State = {
//   address: "",
//   firstname: "",
//   amount: 0,
//   phone: 0,
//   lastname: "",
//   email: "",
// };

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const classes = useStyles();
  const [address, setAddress] = useState<any | null>("");
  const [firstname, setfirstname] = useState<any | null>("");
  const [amount, setAmount] = useState<any | null>(0);
  const [phone, setPhone] = useState<any | null>(0);
  const [lastname, setLastname] = useState<any | null>("");
  const [email, setEmail] = useState<any | null>("");
  const isCheckLogin = localStorage.getItem("isCheckLogin");

  useEffect(() => {
    handleChangeAmount({ value: calculateTotal(cartItems).toFixed(2) });
  }, [amount]);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  const [createCheckout] = CreateCheckoutMutation();
  const [createCheckoutForGuest] = CreateCheckoutForguestMutation();

  const handleCheckout = async (items: CartItemType[]) => {
    let arrFormatItems = [] as any;
    let object = {};
    if (items.length > 0) {
      items.forEach(element => {
        object = {
          name: element?.name,
          price: element.price,
          quantity: element.amount,
          totalprice: parseInt((element.amount * element.price).toFixed(2)),
        };

        arrFormatItems.push(object);
      });
    }

    if (isCheckLogin) {
      // Đăng ký cho khách hàng đã có tài khoản
      await createCheckout({
        variables: {
          address: "",
          amount: parseInt(calculateTotal(items).toFixed(2)),
          product: arrFormatItems,
        },
      }).then(data => {
        cartItems = [];
      });
    } else {
      // Đăng ký cho khách hàng chưa đăng ký tài khoản
      await createCheckoutForGuest({
        variables: {
          address: address.value,
          firstname: firstname.value,
          phone: phone.value,
          lastname: lastname.value,
          email: email.value,
          amount: parseInt(calculateTotal(items).toFixed(2)),
          product: arrFormatItems,
        },
      }).then(data => {
        cartItems = [];
      });
    }
  };

  const handleChangeAddress = (event: any) => {
    setAddress({ value: event.target.value });
  };

  const handleChangefirstname = (event: any) => {
    setfirstname({ value: event.target.value });
  };

  const handleChangeAmount = (data: any) => {
    setAmount({ value: data.value });
  };

  const handleChangePhone = (event: any) => {
    setPhone({ value: event.target.value });
  };

  const handleChangeLastName = (event: any) => {
    setLastname({ value: event.target.value });
  };

  const handleChangeEmail = (event: any) => {
    setEmail({ value: event.target.value });
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

        {
          isCheckLogin === "false" &&
          <div
          style={{
            border: "1px solid",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                required
                id="standard-required"
                onChange={handleChangeAddress}
                label="address"
                defaultValue=""
              />
  
              <TextField
                required
                id="standard-required"
                onChange={handleChangefirstname}
                label="firstname"
                defaultValue=""
              />
  
              <TextField
                required
                id="standard-required"
                onChange={handleChangeLastName}
                label="lastname"
                defaultValue=" "
              />
  
              <TextField
                required
                id="standard-required"
                onChange={handleChangePhone}
                label="phone"
                defaultValue=""
              />
  
              <TextField
                required
                id="standard-required"
                onChange={handleChangeEmail}
                label="email"
                defaultValue=""
              />
  
              <TextField
                required
                disabled
                id="standard-required"
                label="amount"
                defaultValue=""
                value={amount.value}
              />
            </div>
          </form>
        </div>
        }

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="large"
          disableElevation
          variant="contained"
          onClick={() => handleCheckout(cartItems)}
        >
          Thanh toán
        </Button>
      </div>
    </Wrapper>
  );
};

export default Cart;
