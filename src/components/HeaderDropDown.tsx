import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { Switch } from "@headlessui/react";

type HeaderDropDownProps = {
  setOpenDropDown: (val: boolean) => void;
};

const HeaderDropDown: React.FC<HeaderDropDownProps> = ({ setOpenDropDown }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
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
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          All Boards {`(${boards.length})`}
        </h3>
        <div>
          {boards.map((board, index) => {
            return (
              <>
                <div
                  key={index}
                  className={`px-5 py-4 flex items-baseline space-x-2 ${
                    board.isActive && `bg-[#635fc7] rounded-r-full text-white mr-8`
                  }`}
                >
                  <img src={boardIcon} alt="board icon" className="h-4" />
                  <p className="font-bold text-lg">{board.name}</p>
                </div>
              </>
            );
          })}
          <div className={`px-5 py-4 flex items-baseline space-x-2 `}>
            <img src={boardIcon} alt="board icon" className="h-4" />
            <p className="font-bold text-lg text-[#635fc7]">Create New Board</p>
          </div>
          <div className="flex items-center justify-center bg-slate-100 dark:bg-[#20212c] p-4 mx-2 rounded-lg space-x-2">
            <img src={lightIcon} alt="sun indicating lightmode" />
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-blue-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <img src={darkIcon} alt="moon indicating dark mode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
