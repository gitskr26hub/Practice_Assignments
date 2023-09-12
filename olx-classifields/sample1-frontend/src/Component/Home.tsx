import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../Redux/Home/HomeSlice";

interface CategoryType {
  category: "clothing" | "electronic" | "furniture" | "other" | "";
}

const Home = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [category, setCategory] = useState<CategoryType>("");
  const [searchByProduct, setsearchByProduct] = useState<string>("");
  const [Count, setCount] = useState<number[]>([0]);
  const token = JSON.parse(sessionStorage.getItem("user_token")!);
  const [isData, setIsData] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: { loading: boolean; error: boolean; data: {} }) => state.homeReducer
  );

  //  console.log(token)
  useEffect(() => {
    setData([]);
    dispatch(
      fetchUsersData({ page: page, category: category, token: token.token })
    );
  }, [page, category]);

  const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setData([]);
    axios
      .post(
        import.meta.env.VITE_GET_DATA_URL +
          `?size=8&page=${page}&category=${category}&byProduct=${searchByProduct}`,
        {},
        {
          headers: {
            Authorization: token.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const COUNT: number[] = [];
        if (res.data.data.rows.length == 0) {
          setIsData(true);
          setPage(0);
        } else setIsData(false);
        setCategory("");
        for (let i = 0; i < Math.ceil(+res.data.data.count / 8); i++) {
          COUNT.push(i);
        }
        setsearchByProduct("");
        setCount(COUNT);
        setData(res.data.data.rows);
      })
      .catch((err) => {
        if (err) throw new Error(err);
      });
  };

  useEffect(() => {
    const COUNT: number[] = [];
    if (userData.data?.data?.rows?.length == 0) {
      setIsData(true);
      setPage(0);
    } else setIsData(false);

    for (let i = 0; i < Math.ceil(+userData.data?.data?.count / 8); i++) {
      COUNT.push(i);
    }

    setCount(COUNT);
    setData(userData?.data?.data?.rows);
  }, [userData.loading === false, userData.error === false]);

  // console.log("userdata", userData);

  return (
    <div>
      {userData.loading && <h1 className="text-center">Loading....!</h1>}
      <div className="m-auto flex w-10% mt-2 justify-between">
        {!isData && userData.loading === false && userData.error === false && (
          <FormControl sx={{ width: "20%", margin: "auto" }}>
            <InputLabel id="demo-simple-select-label">Select Page</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={page}
              label="pagination"
              onChange={(e) => setPage(e.target.value)}>
              {Count &&
                Count.map((item) => (
                  <MenuItem key={item} value={item}>
                    PageNo {item + 1}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        <FormControl sx={{ width: "20%", margin: "auto" }}>
          <h3>filter by Category</h3>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value={""}>Select</option>
            <option value={"clothing"}>clothing</option>
            <option value={"electronic"}>electronic</option>
            <option value={"furniture"}>furniture</option>
            <option value={"other"}>other</option>
          </select>
        </FormControl>
      </div>

      {/* /// search input /////  */}
      <form className="md:w-[50%] m-auto lg:w-[40%] mt-5" onSubmit={Search}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setsearchByProduct(e.target.value)}
            value={searchByProduct}
            type="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-red dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by product name"
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </div>
      </form>

      {/* /// search input  end here /////    */}

      {!isData && userData.loading === false && userData.error === false && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data.map((product, index) => (
                <div key={index} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.image}
                      alt={product.image}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-md text-gray-900">
                        Name:{product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isData && <h1 className="text-center">No data found here...!</h1>}
    </div>
  );
};

export default Home;
