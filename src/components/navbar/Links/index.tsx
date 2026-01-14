import {
  IconCalendarEvent,
  IconDashboard,
  IconDatabase,
  IconLayersIntersect,
  IconNotes,
  IconSettings,
} from '@tabler/icons-react';
import Page from './link';

function Links() {
  const arr = [
    { name: 'dashboard', link: '/', Icon: <IconDashboard size={"1.5rem"}/> },
    { name: 'Databases', link: '/databases', Icon: <IconDatabase size={"1.5rem"} /> },
    { name: 'Events', link: '/events', Icon: <IconCalendarEvent size={"1.5rem"} /> },
    { name: 'areas', link: '/areas', Icon: <IconLayersIntersect size={"1.5rem"}/> },
    { name: 'notes', link: '/notes', Icon: <IconNotes size={"1.5rem"} /> },
  ];
  return (
    <div className='flex flex-col item-center justify-between h-full pb-20'>
      <div className="links">
        {arr.map((item, i) => (
          <Page id={i} key={i} {...item} />
        ))}
      </div>
      <div className='link group rounded z-40'>
        <div>
          <IconSettings />
        </div>
      </div>
    </div>
  );
}
export default Links;
