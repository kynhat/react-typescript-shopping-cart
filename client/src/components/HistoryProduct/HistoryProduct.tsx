
import Item from "../Item/Item";
import Cart from "../Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Navbar from "../Navbar/Navbar";
import { GetCheckout } from "../../api/checkout-mutation";
// Styles
import { Wrapper, StyledButton } from "./HistoryProduct.styles";
import { DataGrid } from '@mui/x-data-grid';
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


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'amount',
      headerName: 'Tổng tiền đơn hàng',
      width: 300,
      editable: true,
    },
    {
      field: 'product',
      headerName: 'Sản phẩm',
      width: 500,
      editable: true,
    },
  ];
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

const rows = [] as any;

const HistoryProduct = () => {
  // const { data, isLoading, error } = useQuery<CartItemType[]>(
  //   "products",
  //   getProducts
  // );



  const listCheckout = GetCheckout();
  if (listCheckout == undefined) {
    return <LinearProgress />;
  }


  listCheckout.checkouts.forEach((element: any, id: any) => {
    const listNameProduct = [] as any;
    element.productcheckouts.forEach((element: any) => {
      listNameProduct.push(element.name)
    });

    rows.push({
      id: id,
      amount: element.amount,
      address: element.address,
      product: listNameProduct.join(',')
    });
  });
  
  return (
    <Wrapper>
      <Navbar />

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    </Wrapper>
  );
};

export default HistoryProduct;
