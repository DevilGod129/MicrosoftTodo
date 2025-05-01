import {
  SunIcon,
  StarIcon,
  Calendar1Icon,
  SquareUser,
  House,
} from 'lucide-react';
import { JSX } from 'react';

type NewList = {
  name: string;
  id: string;
  icon: JSX.Element;
  num?: number | undefined;
};

export const listElements: NewList[] = [
  {
    name: 'My Day',
    id: '1000',
    icon: <SunIcon className="text-white size-4" id="my_day" />,
  },
  {
    name: 'Important',
    id: '2000',
    icon: <StarIcon className="text-pink-400 size-4" id="imp" />,
  },
  {
    name: 'Planned',
    id: '3000',
    icon: <Calendar1Icon className="text-white size-4" id="plan" />,
  },
  {
    name: 'Assigned to me',
    id: '4000',
    icon: <SquareUser className="text-white size-4" id="assign" />,
  },
  {
    name: 'Tasks',
    id: '5000',
    icon: <House className="text-white size-4" id="task" />,
    num: 0,
  },
];
