import { AppDispatch, RootState } from '@/app/store';
import { setBgColor, setTextColor } from '@/features/activeSlice';

import { Printer, Mail, Pin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { JSX } from 'react/jsx-runtime';

const ThemePanel = () => {
  const colorThemes = [
    'bg-blue-700',
    'bg-purple-400',
    'bg-red-400',
    'bg-green-500',
    'bg-teal-500',
    'bg-gray-400',
    'bg-blue-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-orange-300',
    'bg-green-300',
    'bg-teal-300',
    'bg-gray-300',
    'bg-gray-700',
    'bg-purple-300',
  ];

  const imageThemes = [
    'https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg',
    'https://i.redd.it/uclav2w49ch51.png',
    'https://i.imgur.com/EDjOfUE.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/9fa60a87711043.5dc0b3f7600c5.jpg',
    'https://i.imgur.com/YgSfSQI.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCmUxyPyYhX6MWH0-tWKbsawdvproYQHbe9VZrnOFadpHrSxE-M1yE0rjiaNsYgabknhQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMnUBW4JMXorioakCVhY3rXpP6f6_Lq4YMe2YZR3IL6yFA6RW6-5e3kCggNhst8hLs9hY&usqp=CAU',
    'https://preview.redd.it/3840x2160-tadami-river-japan-v0-e4msgweqz90f1.png?width=1080&crop=smart&auto=webp&s=7ca2a7a3203f769aea09b2113607d6e52c3a7ce9',
    'https://i.imgur.com/RQso6Xh.png',
    'https://i.imgur.com/s2HaKxY.png',
  ];

  const activeBg = useSelector((state: RootState) => state.ActiveTodo.bg_color);
  const activeText = useSelector(
    (state: RootState) => state.ActiveTodo.text_color
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="w-72 p-4 bg-[#1e1e1e] text-white space-y-4 max-h-[70vh] overflow-y-auto">
      <h2 className="text-sm font-medium">Theme</h2>

      <div className="grid grid-cols-5 gap-3">
        {colorThemes.map((color, idx) => (
          <div
            key={idx}
            className={`size-11  ${color} cursor-pointer hover:ring-2 ring-white *:${
              color === activeText ? 'border-yellow-300' : 'border-transparent'
            }`}
            onClick={() => dispatch(setTextColor({ text_color: color }))}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {imageThemes.map((url, idx) => (
          <div
            key={idx}
            className={`size-11  overflow-hidden border-2 ${
              url === activeBg ? 'border-yellow-300' : 'border-transparent'
            }`}
            onClick={() => dispatch(setBgColor({ bg_color: url }))}
          >
            <img src={url} alt="Theme" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="space-y-1 pt-3 border-t border-white/10">
        <ActionItem icon={<Printer className="w-4 h-4" />} label="Print list" />
        <ActionItem icon={<Mail className="w-4 h-4" />} label="Email list" />
        <ActionItem icon={<Pin className="w-4 h-4" />} label="Pin to Start" />
      </div>
    </div>
  );
};

const ActionItem = ({ icon, label }: { icon: JSX.Element; label: string }) => (
  <div className="flex items-center gap-3 px-1 py-1 hover:bg-white/10 rounded cursor-pointer transition">
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

export default ThemePanel;
