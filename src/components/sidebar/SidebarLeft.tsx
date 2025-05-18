import {
  AlignJustify,
  BookOpen,
  Copy,
  Mail,
  PanelLeft,
  Pin,
  Plus,
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
import { useEffect, useRef } from 'react';

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
              itemtype="default"
            />
          ))}

          <hr className=" h-0.25 w-full my-2  bg-gray-700 border-0 dark:bg-gray-600" />

          {/* Here new groups will be added.... */}
          {groups.map((group) => (
            <SidebarLeftItem
              key={group.id}
              groupkey={group.id}
              title={group.name}
              icon={<PanelLeft className="text-gray-300 size-4" />}
              itemtype="group"
            />
          ))}
          {lists.map((list) => (
            <SidebarLeftItem
              key={list.id}
              listkey={list.id}
              title={list.name}
              icon={<AlignJustify className="text-blue-600 size-4" />}
              itemtype="customlist"
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

  clickable,
  itemtype,
}: {
  icon?: JSX.Element;
  title: string;
  tasks?: string;
  listkey?: string | undefined;
  groupkey?: string | undefined;

  num?: number;
  clickable?: boolean;
  itemtype: string;
}) => {
  //Actively used variables holding value:
  const dispatch = useDispatch<AppDispatch>();
  let activeSelectedId = useSelector(
    (state: RootState) => state.ActiveList.active_list_id
  ); //getId

  // Bring lists and groups... and their last added ids:
  const lastListId = useSelector(
    (state: RootState) => state.List.last_added_id
  );
  const lastGroupId = useSelector(
    (state: RootState) => state.Group.last_group_id
  );

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

  //Handling delete
  const HandleDelete = () => {
    if (contextMenu.targetkey && itemtype === 'customlist') {
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
  };

  // rename:
  const handleRename = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };
  // For rename backing:
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newName = e.currentTarget.value.trim();
      if (newName) {
        if (itemtype === 'customlist') {
          dispatch({
            type: 'List/renameList',
            payload: { id: listkey, new_name: newName },
          });
        } else if (itemtype === 'group') {
          dispatch({
            type: 'Group/renameGroup',
            payload: { id: groupkey, new_name: newName },
          });
        }
      }
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  // For focusing:

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      (itemtype === 'customlist' && listkey === lastListId) ||
      (itemtype === 'group' && groupkey === lastGroupId)
    ) {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [lastListId, lastGroupId]);

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

    const menuHeight = 250; // approximate height of your dropdown
    const shouldFlip = window.innerHeight - e.clientY < menuHeight;

    setContextMenu({
      x: e.clientX,
      y: shouldFlip ? e.clientY - menuHeight : e.clientY,
      open: true,
      targetkey: listkey || groupkey,
    });
  };

  // For input field renwriting:
  const [isEditing, setIsEditing] = useState(false);

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
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              defaultValue={title}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className={cn(
                'pr-2 outline-none border-b-2 transition-colors duration-200 bg-transparent text-white',
                !clickable
                  ? 'w-26 border-[#7e7541] focus:border-[#7e7541] selection:bg-[#7e7541]'
                  : 'w-full border-transparent'
              )}
            />
          ) : (
            <span className="text-white">{title}</span>
          )}
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
          side="top"
          className="w-60 rounded-none z-50   bg-stone-900 "
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            transform: 'none',
          }}
        >
          {itemtype === 'customlist' && (
            <>
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
            </>
          )}
          {itemtype === 'default' && (
            <>
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
            </>
          )}
          {itemtype === 'group' && (
            <>
              <DropdownMenuItem
                onSelect={handleRename}
                className="hover:bg-[#3c444c]"
              >
                <BookOpen className="size-5 " /> Rename Group
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => dispatch(addList())}
                className="hover:bg-[#3c444c]"
              >
                <Plus className="size-5 " /> Add a List
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={HandleDelete}
                className="hover:bg-[#3c444c] text-red-500 hover:text-red-500"
              >
                <Trash2 className="size-5 text-red-500" />
                Delete Group
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
