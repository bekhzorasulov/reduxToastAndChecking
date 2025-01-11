import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiProjectorScreenChartLight } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

function Sidebar() {
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);
  return (
    <div className="bg-warning min-h-screen w-[350px] text-white flex flex-col">
      <Avatar user={user} />
      <ul className="flex flex-col pr-0 pl-10 mb-auto">
        <li className="nav-item">
          <NavLink className="block px-3 py-2 rounded-l-3xl" to="/">
            <span className="flex items-center gap-2">
              <PiProjectorScreenChartLight className="text-xl" />
              Projects
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="block px-3 py-2 rounded-l-3xl" to="/create">
            <span className="flex items-center gap-2">
              <IoIosAddCircleOutline className="text-xl" />
              Create
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="block px-3 py-2 rounded-l-3xl" to="/profile">
            <span className="flex items-center gap-2">
              <RiUserSettingsLine className="text-xl" />
              Profile
            </span>
          </NavLink>
        </li>
      </ul>

      <div className="mb-10 flex justify-center">
        <button className="btn btn-warning border-black" onClick={logout}>
          <TbLogout2 />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
