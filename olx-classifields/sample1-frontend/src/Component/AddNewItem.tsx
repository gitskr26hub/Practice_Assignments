import { Button, Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { DeleteDataUser, fetchUserDataSingle } from "../Redux/Personal/PersonalSlice";

const AddNewItem = () => {
  const [data, setData] = useState<dataType[]>([]);
  const token = JSON.parse(sessionStorage.getItem("user_token")!);
  const [open, setOpen] = useState(false);
  const [newdata, setNewdata] = useState<dataType>({
    name: "",
    description: "",
    category: "",
    image: "",
    location: "",
    postedAt: "",
    price: "",
  });
  const dispatch = useDispatch();
  const UserData = useSelector((state:stateType) => state.personal)  
  // console.log(UserData) 

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //  console.log(token)
  useEffect(() => {
    dispatch(fetchUserDataSingle(token.token));
  }, [UserData.isDeleted]);

  useEffect(() => {
    setData(UserData.user);
  }, [UserData.loading === false, UserData.error === false]);

  const Delete = (id: number | string): void => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(DeleteDataUser({token:token.token,id:id}))
      // axios
      //   .delete(import.meta.env.VITE_GET_DATA_DELETE_URL, {
      //     headers: {
      //       Authorization: token.token,
      //     },
      //     data: {
      //       id: id,
      //     },
      //   })
      //   .then((res) => {
          // toast.success(`${res.data.msg}`, {
          //   position: "top-center",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          // });
      //   })
      //   .catch((err) => {
      //     if (err) throw new Error(err);
      //   });
    }
  };

  const handleChange = (a: string, b: string) => {
    setNewdata({ ...newdata, [a]: b });
  };

  function handleNewForm(): void {
    
    console.log(newdata);
    if (
      newdata.name &&
      newdata.category &&
      newdata.description &&
      newdata.image &&
      newdata.price &&
      newdata.location &&
      newdata.postedAt
    ) {
      axios
        .post(import.meta.env.VITE_DATA_CREATE_URL, newdata, {
          headers: { Authorization: token.token },
        })
        .then((res) => {
          handleClose();
          // console.log(res)
          toast.success(`${res.data.msg}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((err) => {
          if (err) throw new Error(err);
        });
    }
  }

  return (
    <div>
      <Box className="m-auto mt-2 items-center justify-center p-5">
        <Button onClick={handleOpen} variant="contained" color="success">
          ADD NEW ITEM
        </Button>
      </Box>

      {/* ///modal added here //// */}
      <div className="w-[10%] mx-auto mt-5 px-5 py-3">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description">
          <Box sx={{ ...style, width: 400, overflowY: "scroll" }}>
            <div className="heading bg-indigo-900 w-[100%] mx-auto p-1 top-0 sticky ">
              <p className="text-white px-5 font-bold">
                Add new Item
                <button
                  className="absolute z-[100]  right-[2%] text-red-700"
                  onClick={handleClose}></button>
              </p>
            </div>
           
              <div className="mb-1 mt-2">
                <label className="block text-gray-700 font-semibold text-[14px] italic">
                  name :
                </label>
                <input
                  name="name"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="border mt-1 rounded w-full py-2 px-3 text-gray-700 leading-tight  "
                  type="text"
                  placeholder="Shop No"
                />
              </div>
              <div className="mb-1 mt-2">
                <label className="block text-gray-700 font-semibold text-[14px] italic">
                  price :
                </label>
                <input
                  name="price"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="border mt-1 rounded w-full py-2 px-3 text-gray-700 leading-tight  "
                  type="number"
                  placeholder="Price"
                />
              </div>
              <div className="mb-1 mt-2">
                <label className="block text-gray-700 font-semibold text-[14px] italic">
                  description :
                </label>
                <input
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  name={"description"}
                  className="border mt-1 rounded w-full py-2 px-3 text-gray-700 leading-tight  "
                  type="text"
                  placeholder="description"
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-700 font-semibold text-[14px] italic">
                  image url :
                </label>
                <input
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  name={"image"}
                  type="url"
                  className="border mt-1 rounded w-full py-2 px-3 text-gray-700 leading-tight  "
                  placeholder="image url"
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-700 font-semibold text-[14px] italic">
                  location :
                </label>
                <input
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  name="location"
                  className="border mt-1 rounded w-full py-2 px-3 text-gray-700 leading-tight  "
                  placeholder="location"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 font-semibold text-[14px] italic">
                  category :
                </label>
                <select
                  onChange={(e) => {
                    handleChange(e.target.name, e.target.value);
                  }}
                  name="category"
                  className="border mt-1 rounded w-full py-2 px-3 text-gray-700 bg-blue-100"
                  // value={update.paymentMode}
                >
                  <option value="">Select</option>
                  <option value={"clothing"}>clothing</option>
                  <option value={"electronic"}>electronic</option>
                  <option value={"furniture"}>furniture</option>
                  <option value={"other"}>other</option>
                </select>
              </div>

              <div className="mb-1">
                <label className="block text-gray-700 font-semibold text-[14px] italic">
                  Date :
                </label>
                <input
                  type="date"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  name={"postedAt"}
                  className="border mt-1 rounded w-full py-2 px-3 text-gray-700 leading-tight  "
                  placeholder="date"
                />
              </div>

              <div className="flex items-center justify-between px-8 mt-2">
                <button
                  className="bg-blue-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded  focus:shadow-outline"
                  type="button"
                  onClick={handleClose}>
                  Cancel
                </button>
                <button  onClick={handleNewForm}
                  className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded  focus:shadow-outline"
                 >
                  Submit
                </button>
              </div>
          
          </Box>
        </Modal>
      </div>

      {/* ///modal end here//// */}

      {!UserData.loading && !UserData.error && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {!UserData.loading && !UserData.error &&  data.map((product, index) => (
                <div
                  key={index}
                  className="group relative  bg-gray-100 p-2 rounded-md">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.image}
                      alt={product.image}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700"></h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-blue-900">
                      {product.price}/-
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="contained" color="success">
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        if (product._id) Delete(product._id); // for mongo
                        else Delete(product.id);
                      }}
                      variant="contained"
                      color="error">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AddNewItem;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 1,
};
