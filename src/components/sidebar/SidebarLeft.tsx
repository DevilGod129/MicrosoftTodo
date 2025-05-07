import { AlignJustify, PanelLeft, PlusIcon, SidebarIcon } from 'lucide-react';

import { setActiveList } from '@/features/activeList';
import { addList } from '@/features/listSlice';
import { listElements } from '@/lib/data';
import { JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { addGroup } from '../../features/groupSlice';
import { cn } from '@/lib/utils';

function SidebarLeft() {
  const dispatch = useDispatch<AppDispatch>();
  let groups = useSelector((state: RootState) => state.Group.groups);
  let lists = useSelector((state: RootState) => state.List.lists);

  // let groups = useSelector((state) => state.);

  return (
    <div className="h-full bg-[#272727] px-4 py-3 flex-col flex justify-between rounded-none overflow-hidden relative cursor-default">
      <div className="flex-grow overflow-y-auto overflow-x-clip  ">
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
              //    onClick = //dispatch the id for active selected method
              title={list.name}
              icon={list.icon}
              clickable={true}
            />
          ))}

          <hr className=" h-0.25 w-full my-2  bg-gray-700 border-0 dark:bg-gray-600" />

          {/* Here new groups will be added.... */}
          {groups.map((group) => (
            <SidebarLeftItem
              key={group.id}
              // listkey={group.id}
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

      <div className="text-white flex  flex-row  justify-between items-center p-1 bg-[#272727] border-t border-gray-700 min-h-5 ">
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
  clickable,
}: {
  icon?: JSX.Element;
  title: string;
  tasks?: string;
  listkey?: string | undefined;
  num?: number;
  clickable?: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  let activeSelectedId = useSelector(
    (state: RootState) => state.ActiveList.active_list_id
  ); //getId

  const handleClick = (key: string | undefined) => {
    console.log('Clicked listkey: ', key);
    if (key) {
      dispatch(setActiveList({ list_id: key }));
    }
  };

  const handleChange = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  let taskNum = 0;
  if (listkey) {
    let todos = useSelector((state: RootState) => state.Todo.todos);
    taskNum = todos.filter((todo) => todo.list_id === listkey).length;
    if (listkey == '2000') {
      let num = todos.filter((todo) => todo.imp_list_id === '2000').length;
      taskNum += num;
    }
  }

  return (
    <div
      className={cn(
        'flex hover:bg-[#333333] mb-1  p-2 justify-between items-center font-extralight  ',

        activeSelectedId == listkey && 'bg-[#333333] hover:bg-'
      )}
      onClick={() => handleClick(listkey)}
    >
      <div className="text-white flex gap-3 items-center">
        {' '}
        {icon} <input type="text" defaultValue={title} disabled={clickable} />
      </div>
      {taskNum > 0 && (
        <div className=" text-sm flex rounded-full items-center justify-center bg-[#3c444c] size-6 px-2 py-2 text-white ">
          {taskNum}
        </div>
      )}
      {/* {tasks ? (
        <div className="ml-auto flex items-center justify-center w-6 h-6  rounded-full bg-[#333333] text-white text-sm">
          {tasks}
        </div>
      ) : null} */}
    </div>
  );
};
