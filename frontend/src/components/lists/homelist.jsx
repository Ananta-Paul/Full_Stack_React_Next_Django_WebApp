import Horizontallist, { GetCatalouge } from "./horizontallist";

const HomeList = async ({ handleList }) => {
  return (
    <>
      {/* <Horizontallist heading={"Trending"}>
        <GetCatalouge q={"trending"} />
      </Horizontallist> */}
      <Horizontallist heading={"Top Gainers"}>
        <GetCatalouge q={"day_gainers"} />
      </Horizontallist>
      <Horizontallist heading={"Top Loser"}>
        <GetCatalouge q={"day_losers"} />
      </Horizontallist>
      <Horizontallist heading={"Most Active"}>
        <GetCatalouge q={"most_actives"} />
      </Horizontallist>
    </>
  );
};

export default HomeList;
