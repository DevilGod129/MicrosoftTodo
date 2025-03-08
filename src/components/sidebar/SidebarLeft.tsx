import {
  Calendar1Icon,
  House,
  PanelLeft,
  PlusIcon,
  SidebarIcon,
  SquareUser,
  StarIcon,
  SunIcon,
  // Search,
  // HomeIcon,
} from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';

import { addGroup } from '../../features/groupSlice';
import { JSX } from 'react';
import { RootState } from '../../app/store';

function Sidebar_left() {
  const dispatch = useDispatch();
  let groups = useSelector((state: RootState) => state.Group.groups);
  // let groups = useSelector((state) => state.);
  return (
    <div className="h-full w-auto bg-[#1D2125] px-4 py-3 flex-col flex justify-between ">
      <div>
        <div className="flex min-h-15 pb-8 ">
          {/* <!-- Circle --> */}
          <div className="h-14 w-14 rounded-full bg-blue-400 px-4 py-3 text-2xl text-white">
            PP
          </div>
          <div>
            <div className="px-3 py-2 text-white">
              Prasun Paudel
              <div className="text-gray-500">paudelprasun@gmail.com</div>
            </div>
          </div>
        </div>

        <div className="min-h-fit   gap-5  ">
          {/* Search Button.... */}
          {/* <div classNameName="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          classNameName="w-full bg-gray-800 text-white rounded-md py-2 pl-8 pr-4 outline-none"
        />
        <Search classNameName="w-4 h-4 text-gray-400 absolute left-2 top-3" />
      </div> */}

          <SidebarLeftItem
            title={'My Day'}
            icon={<SunIcon className="text-white size-4" id="my_day" />}
          />
          <SidebarLeftItem
            title={'Important'}
            icon={<StarIcon className="text-pink-400 size-4" id="imp" />}
          />
          <SidebarLeftItem
            title={'Planned'}
            icon={<Calendar1Icon className="text-green-400 size-4" id="" />}
          />
          <SidebarLeftItem
            title={'Assigned to me'}
            icon={<SquareUser className="text-green-500 size-4" />}
          />
          <SidebarLeftItem
            title={'Tasks'}
            icon={<House className="text-gray-400 size-4" />}
            tasks={`${3}`}
          />

          <hr className=" h-0.25 w-full  bg-gray-200 border-0 dark:bg-gray-600" />

          {/* Here new groups will be added.... */}
          {groups.map((group) => (
            <SidebarLeftItem
              title={group.name}
              icon={<PanelLeft className="text-white size-4" />}
            />
          ))}
        </div>
      </div>

      <div className="text-white w-full flex min-h-5 flex-row  justify-between items-center gap-2 ">
        <div className="flex hover:bg-gray-700 w-full p-2 rounded-lg">
          <PlusIcon />
          <span>New List</span>
        </div>
        <div
          className="hover:bg-gray-700 flex p-2 rounded-lg"
          onClick={() => dispatch(addGroup())}
        >
          <SidebarIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar_left;

const SidebarLeftItem = ({
  icon,
  title,
  tasks,
}: {
  icon?: JSX.Element;
  title: string;
  tasks?: string;
}) => {
  return (
    <div className="flex hover:bg-[#424b53] mb-3 hover:rounded-md p-2 items-center font-extralight ">
      {icon} <div className="text-white px-4  ">{title}</div>
      {/* <span classNameName="ml-auto text-sm rounded-full bg-[#3c444c] h-3 w-3 px-2 py-2 text-white ">{num}</span> */}
      {tasks ? (
        <div className="ml-auto flex items-center justify-center w-6 h-6  rounded-full bg-[#2a2f34] text-white text-sm">
          {tasks}
        </div>
      ) : null}
    </div>
  );
};
