import { AlignJustify, PanelLeft, PlusIcon, SidebarIcon } from 'lucide-react';

import { setActiveList } from '@/features/activeList';
import { addList } from '@/features/listSlice';
import { listElements } from '@/lib/data';
import { JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { addGroup } from '../../features/groupSlice';

function SidebarLeft() {
  const dispatch = useDispatch<AppDispatch>();
  let groups = useSelector((state: RootState) => state.Group.groups);
  let lists = useSelector((state: RootState) => state.List.lists);
  // let groups = useSelector((state) => state.);

  return (
    <div className="h-full bg-[#272727] px-4 py-3 flex-col flex justify-between rounded-none overflow-hidden relative">
      <div className="flex-grow overflow-y-clip">
        <div className="flex min-h-15 pb-8 w-full">
          {/* <!-- Circle --> */}
          <div className="h-14 w-14 rounded-full bg-blue-400 px-4 py-3 text-2xl text-white">
            PP
          </div>
          <div>
            <div className="px-3 py-2 text-white">
              Prasun Paudel
              <div className="text-gray-500 ">paudelprasun@gmail.com</div>
            </div>
          </div>
        </div>

        <div className="min-h-fit   gap-5  ">
          {listElements.map((list) => (
            <SidebarLeftItem
              key={list.id}
              listkey={list.id}
              title={list.name}
              icon={list.icon}
              num={list.num}
            />
          ))}

          <hr className=" h-0.25 w-full  bg-gray-200 border-0 dark:bg-gray-600" />

          {/* Here new groups will be added.... */}
          {groups.map((group) => (
            <SidebarLeftItem
              key={group.id}
              listkey={group.id}
              title={group.name}
              icon={<PanelLeft className="text-gray-300 size-4" />}
            />
          ))}
          {lists.map((list) => (
            <SidebarLeftItem
              key={list.id}
              listkey={list.id}
              title={list.name}
              icon={<AlignJustify className="text-blue-600 size-4" />}
            />
          ))}
        </div>
      </div>

      <div
        className={`text-white flex min-h-5 flex-row  justify-between items-center  bottom-0 left-0 p-2 bg-[#272727] `}
      >
        <div
          className="flex hover:bg-[#333333] w-full p-2 rounded items-center"
          onClick={() => dispatch(addList())}
        >
          <PlusIcon className="size-5 me-1" />
          <span>New List</span>
        </div>
        <div
          className="hover:bg-[#333333] flex p-2 rounded"
          onClick={() => dispatch(addGroup())}
        >
          <SidebarIcon className="size-5" />
        </div>
      </div>
    </div>
  );
}

export default SidebarLeft;

const SidebarLeftItem = ({
  icon,
  title,
  tasks,
  listkey,
  num,
}: {
  icon?: JSX.Element;
  title: string;
  tasks?: string;
  listkey?: string | undefined;
  num?: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (key: string | undefined) => {
    console.log('Clicked listkey: ', key);
    if (key) {
      dispatch(setActiveList({ list_id: key }));
    }
  };
  return (
    <div
      className="flex hover:bg-[#333333] mb-1 hover:rounded-md p-2 items-center font-extralight "
      onClick={() => handleClick(listkey)}
    >
      {icon} <div className="text-white px-4  ">{title}</div>
      {typeof num === 'number' && num > 0 && (
        <span className="ml-auto text-sm flex rounded-full items-center justify center bg-[#3c444c] size-6 px-2 py-2 text-white ">
          {num}
        </span>
      )}
      {tasks ? (
        <div className="ml-auto flex items-center justify-center w-6 h-6  rounded-full bg-[#333333] text-white text-sm">
          {tasks}
        </div>
      ) : null}
    </div>
  );
};
