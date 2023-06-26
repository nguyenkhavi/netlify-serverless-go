//THIRD PARTY MODULES
import classcat from 'classcat';
//RELATIVE MODULES
import MobileNav from '../../comps/MobileNav';

function MenuMobile() {
  return (
    <div className={classcat(['grid grid-flow-col items-center justify-between p-4', 'md:hidden'])}>
      <p className={classcat(['text-subtitle1 text-primary-700'])}>Message</p>
      <MobileNav />
    </div>
  );
}

export default MenuMobile;
