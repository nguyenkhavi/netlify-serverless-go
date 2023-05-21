//THIRD PARTY MODULES
import classcat from 'classcat';
//RELATIVE MODULES
import Adv from './Adv';
import Info from './Info';
import Copyright from './Copyright';

export default function Footer() {
  return (
    <footer
      id="footer"
      className={classcat([
        'bg-footer-mobile px-[--px] pb-[13px] pt-[47px]',
        'sm:bg-footer-desktop 2xl:shadow-[inset_0_1px] 2xl:shadow-white/[.14]',
      ])}
    >
      <Info />
      <Adv />
      <Copyright />
    </footer>
  );
}
