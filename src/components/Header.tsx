import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import { useState } from "react";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import CreateEditBoardModal from "../modals/CreateEditBoardModal";

type HeaderProps = {
  boardOpen: boolean;
  setBoardOpen: (val: boolean) => void;
};

function Header({ boardOpen, setBoardOpen }: HeaderProps) {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  console.log(boardOpen);
  return (
    <div className="p-4 fixed bg-white dark:bg-[#2b2c37] z-50 right-0 left-0">
      <header className="flex justify-between dark:text-white items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl ">Kanban</h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">Board Name</h3>
            <img
              className="w-3 ml-2 md:hidden cursor-pointer"
              src={openDropDown ? iconUp : iconDown}
              alt="dropdown icon"
              onClick={() => setOpenDropDown((prevState) => !prevState)}
            />
          </div>
        </div>
        {/** rightSide */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="button hidden md:block">+ Add New Task</button>
          <button className="button py-1 px-3 md:hidden">+</button>
          <img src={ellipsis} alt="ellipsis icon" className="cursor-pointer h-6 " />
        </div>
      </header>

      {openDropDown && <HeaderDropDown setBoardOpen={setBoardOpen} setOpenDropDown={setOpenDropDown} />}

      {boardOpen && <CreateEditBoardModal setBoardOpen={setBoardOpen} />}
    </div>
  );
}

export default Header;
