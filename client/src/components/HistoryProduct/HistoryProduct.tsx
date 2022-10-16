import Item from "../Item/Item";
import Cart from "../Cart/Cart";
import { makeStyles, Button } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Navbar from "../Navbar/Navbar";
import { GetCheckout } from "../../api/checkout-mutation";
// Styles
import { Wrapper } from "./HistoryProduct.styles";
import { DataGrid } from "@mui/x-data-grid";
// Types
import logoSuccess from "../../image/images.png";
import {useNavigate} from 'react-router-dom';

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

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "amount",
    headerName: "Tổng tiền đơn hàng",
    width: 200,
    editable: true,
  },
  {
    field: "product",
    headerName: "Sản phẩm",
    width: 200,
    editable: true,
  },
];
const rows = [] as any;

const HistoryProduct = () => {
  const listCheckout = GetCheckout();
  const navigate = useNavigate();

  if (listCheckout == undefined) {
    return <LinearProgress />;
  }

  listCheckout.checkouts.forEach((element: any, id: any) => {
    const listNameProduct = [] as any;
    element.productcheckouts.forEach((element: any) => {
      listNameProduct.push(element.name);
    });

    rows.push({
      id: id,
      amount: element.amount,
      product: listNameProduct.join(","),
    });
  });

  const handleCheckout = () => {
    navigate('/')
  };

  return (
    <Wrapper>
      <Navbar />

      <div style={{margin: "5% auto"}}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img style={{ width: "20%", marginBottom: "5%" }} src={logoSuccess} />
        </div>

        <div style={{textAlign: "center"}}>
          <h2>Order Success</h2>
        </div>

        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} hideFooterPagination />
        </div>

        <div style={{textAlign: "center", marginTop: "5%"}}>
        <Button
          size="large"
          disableElevation
          variant="contained"
          onClick={() => handleCheckout()}
        >
          back to product page
        </Button>
        </div>

      </div>
    </Wrapper>
  );
};

export default HistoryProduct;
