import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div></div>
      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0rgb(34_41_47_/5%)] transition-all`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img
              className="w-full h-full"
              src="/Creationz-8-9-2024.png"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
