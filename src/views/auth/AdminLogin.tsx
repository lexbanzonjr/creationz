import { useState } from "react";
import { admin_login } from "../../store/Reducers/authReducer";
import { useAppDispatch } from "../../store/hook";
import { PropagateLoader } from "react-spinners";
import { useSelector } from "react-redux";

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const { loader } = useSelector((state: any) => state.auth);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItem: "center",
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#cbcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src="/Creationz-8-9-2024.png"
                alt="logo"
              />
            </div>
          </div>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="text"
                name="email"
                placeholder="email"
                id="email"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
              />
            </div>

            <button
              disabled={loader ? true : false}
              className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
