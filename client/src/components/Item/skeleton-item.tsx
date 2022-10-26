import { WrapperSkeleton } from "./Item.styles";
import "./item.scss";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonItem = () => (
  <div className="skeletonItem">
    <WrapperSkeleton>
      <Stack spacing={0.2}>
        <Skeleton variant="rectangular" min-width={150} height={250} />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} min-width={200} width={200}/>

        <Skeleton variant="text" sx={{ fontSize: "2rem" }} min-width={150} width={140} />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} min-width={150} width={90} />
      </Stack>
    </WrapperSkeleton>
  </div>
);

export default SkeletonItem;
