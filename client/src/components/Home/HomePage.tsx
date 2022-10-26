import { useEffect, useState } from "react";
// Components
import Item from "../Item/Item";
import Cart from "../Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Navbar from "../Navbar/Navbar";
import { GetProduct, PRODUCT } from "../../api/product-mutation";
import { Wrapper, StyledButton } from "./HomePage.styles";
import "./home.scss";
import { useQuery } from "@apollo/client";
import SkeletonItem from "../Item/skeleton-item";
import { log } from "console";
// Types
export type CartItemType = {
  name: any;
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const listDataSkeleton = [
  {
    id: "634bca641d58fe3f5ebfb32e",
    name: "điện thoại C33",
    image:
      "",
    price: 3000,
  },
  {
    id: "634bca981d58fe3f5ebfb330",
    name: "sam sung galaxy Tab A7",
    image:
      "",
    price: 1000,
  },
  {
    id: "634bcad01d58fe3f5ebfb332",
    name: "Asuss ROG strix Gaming",
    image:
      "",
    price: 5000,
  },
  {
    id: "634bcbc31d58fe3f5ebfb336",
    name: "Asuss ROG strix Gaming Pro",
    image:
      "",
    price: 4000,
  },
  {
    id: "634bcbf91d58fe3f5ebfb338",
    name: "Anker MagGo",
    image:
      "",
    price: 900,
  },
  {
    id: "634bcc161d58fe3f5ebfb33a",
    name: "Xmoblie",
    image:
      "",
    price: 500,
  },
];

const HomePage = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { loading, error, data } = useQuery(PRODUCT);
  console.log("data", data);

  //total cart items when add cart
  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  // if (loading) return <LinearProgress />;

  if (error) return <div>Something went wrong ...</div>;

  return (
    <div className="HomePage">
      <Navbar />
      <div className="HomePage__container">
        <Wrapper>
          <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <Cart
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          </Drawer>

          <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </StyledButton>

          <Grid container spacing={3}>
            {!loading
              ? data?.products.map((item: any) => (
                  <Grid item key={item.id} xs={12} sm={4}>
                    <Item item={item} handleAddToCart={handleAddToCart} />
                  </Grid>
                ))
              : listDataSkeleton.map((item: any) => (
                  <Grid item key={item.id} xs={12} sm={4}>
                    <SkeletonItem />
                  </Grid>
                ))}
          </Grid>
        </Wrapper>
      </div>
    </div>
  );
};

export default HomePage;
