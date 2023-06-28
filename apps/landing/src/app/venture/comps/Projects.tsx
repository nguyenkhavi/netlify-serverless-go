//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//RELATIVE MODULES
import ProjectCard, { TProjectValue } from './ProjectCard';

export default function Projects() {
  return (
    <section className="mt-10 px-[--px]">
      <div className="flex items-center justify-between">
        <h2 className="text-h4 xlg:text-h3">Current Projects</h2>
        <Link href="#" className="hidden text-caption text-text-60 hover:underline xlg:block">
          View All
        </Link>
      </div>
      <div className={classcat(['mt-4 grid grid-cols-2 gap-4 xlg:mt-6 xlg:grid-cols-4'])}>
        {dataProjects.map((item) => (
          <ProjectCard key={item.id} value={item} />
        ))}
      </div>
    </section>
  );
}

const dataProjects: TProjectValue[] = [
  {
    id: 1,
    image: '/images/venture/item-1.png',
    name: 'Golden Hand',
    token: '100,000 ID',
    price: '1ID= 0.9923 BUSD',
    date: 'March 22',
  },
  {
    id: 2,
    image: '/images/venture/item-2.png',
    name: 'Golden Hand',
    token: '100,000 ID',
    price: '1ID= 0.9923 BUSD',
    date: 'March 22',
  },
  {
    id: 3,
    image: '/images/venture/item-1.png',
    name: 'Golden Hand',
    token: '100,000 ID',
    price: '1ID= 0.9923 BUSD',
    date: 'March 22',
  },
  {
    id: 4,
    image: '/images/venture/item-2.png',
    name: 'Golden Hand',
    token: '100,000 ID',
    price: '1ID= 0.9923 BUSD',
    date: 'March 22',
  },
];
