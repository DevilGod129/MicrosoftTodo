import {
  AlignJustify,
  BookOpen,
  Copy,
  Mail,
  PanelLeft,
  Pin,
  PlusIcon,
  Printer,
  SidebarIcon,
  Trash2,
  UserRoundPlus,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setActiveList } from '@/features/activeList';
import { addList, deleteList } from '@/features/listSlice';
import { listElements } from '@/lib/data';
import { cn } from '@/lib/utils';
import { JSX, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { addGroup, deleteGroup } from '../../features/groupSlice';
import { Root } from 'react-dom/client';

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
              groupkey={group.id}
              list={false}
              title={group.name}
              icon={<PanelLeft className="text-gray-300 size-4" />}
            />
          ))}
          {lists.map((list) => (
            <SidebarLeftItem
              key={list.id}
              listkey={list.id}
              list={true}
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
  listkey,
  groupkey,
  list,
  clickable,
}: {
  icon?: JSX.Element;
  title: string;
  tasks?: string;
  listkey?: string | undefined;
  groupkey?: string | undefined;
  list?: boolean;
  num?: number;
  clickable?: boolean;
}) => {
  //Actively used variables holding value:
  const dispatch = useDispatch<AppDispatch>();
  let activeSelectedId = useSelector(
    (state: RootState) => state.ActiveList.active_list_id
  ); //getId

  // Bring lists and groups...

  let group = useSelector((state: RootState) => state.Group.groups);
  let createdlist = useSelector((state: RootState) => state.List.lists);

  const handleClick = (key: string | undefined) => {
    console.log('Clicked listkey: ', key);
    if (key) {
      dispatch(setActiveList({ list_id: key }));
    }
  };

  //Calculating number of tasks:
  let taskNum = 0;
  if (listkey) {
    let todos = useSelector((state: RootState) => state.Todo.todos);
    taskNum = todos.filter((todo) => todo.list_id === listkey).length;
    if (listkey == '2000') {
      let num = todos.filter((todo) => todo.imp_list_id === '2000').length;
      taskNum += num;
    }
  }

  // Handle onclicks:

  // const HandleRename = () =>{

  // }
  //Handling delete
  const HandleDelete = () => {
    if (!clickable) {
      if (contextMenu.targetkey && list) {
        let uniquelist = createdlist.find(
          (list) => list.id === contextMenu.targetkey
        );
        dispatch(
          deleteList({ id: contextMenu.targetkey, num_id: uniquelist?.num_id })
        );
      } else {
        let uniquegroup = group.find(
          (group) => group.id === contextMenu.targetkey
        );
        dispatch(
          deleteGroup({
            id: contextMenu.targetkey,
            num_id: uniquegroup?.num_id,
          })
        );
      }
    }
  };

  // rename:
  const handleRename = () => {
    if (!clickable) {
      alert(`Rename list ${contextMenu.targetkey}`);
    }
  };
  // Prequistes for right click:

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    open: boolean;
    targetkey?: string;
  }>({
    x: 0,
    y: 0,
    open: false,
    targetkey: undefined,
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      open: true,
      targetkey: listkey ?? groupkey,
    });
  };

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        className={cn(
          'relative flex  hover:bg-[#333333] mb-1  p-2 justify-between items-center font-extralight hover:rounded-sm ',

          activeSelectedId == listkey && 'bg-[#333333] rounded-sm'
        )}
        onClick={() => handleClick(listkey)}
      >
        {activeSelectedId == listkey && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-500 rounded-r-sm"></span>
        )}
        <div className="text-white flex gap-3 items-center">
          {' '}
          {icon}
          <input
            type="text"
            defaultValue={title}
            disabled={clickable}
            className={cn(
              'pr-2 outline-none border-b-2 transition-colors duration-200',
              !clickable
                ? 'w-40 border-white/20 focus:border-blue-500'
                : 'w-full border-transparent'
            )}
          />
        </div>
        {taskNum > 0 && (
          <div className=" text-sm flex rounded-full items-center justify-center bg-[#3c444c] size-6 px-2 py-2 text-white ">
            {taskNum}
          </div>
        )}
      </div>

      {/* //Right click: */}

      <DropdownMenu
        open={contextMenu.open}
        onOpenChange={(open) => setContextMenu({ ...contextMenu, open })}
      >
        <DropdownMenuTrigger asChild>
          <button className="hidden" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60 rounded-none z-50 bg-stone-900 "
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            transform: 'none',
          }}
        >
          <DropdownMenuItem
            onSelect={handleRename}
            className="hover:bg-[#3c444c]"
          >
            <BookOpen className="size-5 " /> Rename List
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => alert('List Shared')}
            className="hover:bg-[#3cl 444c]"
          >
            <UserRoundPlus className="size-5 " />
            Share List
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => alert('List Printed')}
            className="hover:bg-[#3c444c]"
          >
            <Printer className="size-5 " />
            Print List
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => alert('List Emailed')}
            className="hover:bg-[#3c444c]"
          >
            <Mail className="size-5 " />
            Email List
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => alert('List Pinned')}
            className="hover:bg-[#3c444c]"
          >
            <Pin className="size-5 " />
            Pin to Start
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => alert('List Duplicated')}
            className="hover:bg-[#3c444c]"
          >
            <Copy className="size-5 " />
            Duplicate list
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={HandleDelete}
            className="hover:bg-[#3c444c] text-red-500 hover:text-red-500"
          >
            <Trash2 className="size-5 text-red-500" />
            Delete List
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
