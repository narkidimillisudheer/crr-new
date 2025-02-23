import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaCog, FaUserCog, FaChevronDown, FaAccessibleIcon, FaComment, FaChevronUp } from "react-icons/fa";
import { IoMdSwitch } from "react-icons/io";
import { RiShutDownLine } from "react-icons/ri";



export function BottomSidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const footerItems = [
    { name: 'Settings', icon: <FaCog />, path: '#' },
    { name: 'Support', icon: <FaUserCog />, path: '#' },
  ];
  return (
    <nav className="flex flex-col px-2 justify-end gap-y-3">
      {/* <ModeToggle /> */}
      {/* <Link className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground" to={"/user/inbox"}>
                <Inbox className="w-5 h-5" />
                <span>Inbox</span>
            </Link> */}
            <div className="p-6">
          <ul>
            <li className="relative">
              {/* Dropdown Menu for Settings */}
              {isSettingsOpen && (
                <ul className="absolute-top left-0 mt-2 w-48 bg-primary_white text-primary_dark rounded-lg shadow-lg dark:bg-primary_dark dark:text-primary_white">
                  <li className="p-2 border-l-4 border-transparent hover:bg-primary_hover_2 font-sans hover:border-l-4 hover:border-primary_gray dark:hover:text-primary_dark">
                  <Link to="#" className="flex items-center">
                      <FaComment className="mr-2" />
                      Beta Feedback Form
                    </Link>
                  </li>
                  <li className="p-2 border-l-4 border-transparent hover:bg-primary_hover_2 hover:border-l-4 hover:border-primary_gray dark:hover:text-primary_dark">
                    <button className="flex items-center w-full ">
                      <IoMdSwitch className="mr-2" />
                      Switch Dark Mode
                    </button>
                  </li>
                  <li className="p-2 border-l-4 border-transparent hover:bg-primary_hover_2 hover:border-l-4 hover:border-primary_gray dark:hover:text-primary_dark">
                    <Link to="#" className="flex items-center">
                      <FaAccessibleIcon className="mr-2" />
                      Accessibility
                    </Link>
                  </li>
                  <li className="p-2 border-l-4 border-transparent hover:bg-primary_hover_2 hover:border-l-4 hover:border-primary_gray dark:hover:text-primary_dark">
                  <Link to="#" className="flex items-center text-primary_red">
                      <RiShutDownLine className="mr-2" />
                      Log Out
                    </Link>
                  </li>
                </ul>
              )}
              <div className="flex items-center p-2 text-primary_sidebar hover:text-primary_white cursor-pointer" onClick={toggleSettingsDropdown}>
                <span className="text-lg text-white-300 ml-5">{footerItems[0].icon}</span>
                <span className="ml-3 text-18">{footerItems[0].name}</span>
                {isSettingsOpen?<FaChevronUp className="ml-auto" />:<FaChevronDown className="ml-auto" />}
              </div>
              
            </li>
            <li className="flex items-center p-2 text-primary_sidebar hover:text-primary_white cursor-pointer ">
              <Link to={footerItems[1].path} className="flex items-center w-full">
                <span className="text-lg text-white-300 ml-5">{footerItems[1].icon}</span>
                <span className="ml-3 text-18">{footerItems[1].name}</span>
              </Link>
            </li>
          </ul>
        </div>
    </nav>
  );
}
