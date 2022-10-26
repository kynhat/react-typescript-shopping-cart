import Button from "@material-ui/core/Button";
// Types
import { CartItemType } from "../Home/HomePage";
// Styles
import { Wrapper } from "./Item.styles";
import "./item.scss";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <div className="productItem">
      <div className="productItem__wrapper-image">
        <img
          src={item.image}
          alt={item.title}
          className="productItem__image"
        />
      </div>
      <div className="productItem__wrapper-title">
        <h5 className="productItem__item">{item.name}</h5>
        <h3 className="productItem__item">${item.price}</h3>
      </div>

      <div className="productItem__wrapper-button">
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
      </div>
    </div>
  </Wrapper>
);

export default Item;
