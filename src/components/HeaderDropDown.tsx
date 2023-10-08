import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type HeaderDropDownProps = {
  setOpenDropDown: (val: boolean) => void;
};

const HeaderDropDown: React.FC<HeaderDropDownProps> = ({ setOpenDropDown }) => {
  const boards = useSelector((state: RootState) => state.boards);
  console.log(boards);
  return (
    <div
      className="py-10 px-6 left-0 right-0 absolute top-16 bottom-[-100vh] dropdown"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropDown(false);
      }}
    >
      {/* dropdown model */}
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">All Boards</h3>
        <div></div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
