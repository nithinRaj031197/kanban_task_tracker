import { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";

type Props = {};

const Header: React.FC<Props> = () => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const onDropdownClick = () => {
    setOpenDropDown((prev) => !prev);
  };
  return (
    <div className="p-4 fixed bg-white dark:bg-[#2b2c37] z-50 right-0 left-0">
      <header className="flex justify-between items-center dark:text-white">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-sans font-bold md:text-4xl">Kanban</h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">Board Name</h3>
            <img
              src={openDropDown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>
        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button className=" button hidden md:block ">+ Add New Task</button>
          <button className=" button py-1 px-3 md:hidden ">+</button>
          <img src={elipsis} alt="elipsis" className=" cursor-pointer h-6" />
        </div>
      </header>
    </div>
  );
};

export default Header;
