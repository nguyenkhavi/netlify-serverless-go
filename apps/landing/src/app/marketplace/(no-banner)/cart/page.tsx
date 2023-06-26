'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import Decimal from 'decimal.js';
import { TDataCheckout } from '_@landing/utils/type';
import { useEffect, useMemo, useState } from 'react';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import NoData from '_@landing/components/NoData';
import CartItemCard from './components/CartItemCard';

export default function CartPage() {
  const [data, setData] = useState<TDataCheckout[]>([]);

  const totalPrices = useMemo(
    () =>
      data.reduce((acc, item) => {
        const price = new Decimal(item.price);
        return price.add(acc).toNumber();
      }, 0),
    [data],
  );

  const _handleRemoveItem = (listingId: number) => {
    const newData = data.filter((item) => item.listingId !== listingId);
    setData(newData);
    window.localStorage.setItem('cart', JSON.stringify(newData));
  };

  useEffect(() => {
    if (!window) return;
    const dataStorage = window.localStorage.getItem('cart') || '';
    setData(JSON.parse(dataStorage));
  }, []);

  return (
    <section className="px-[--px] pb-6 xlg:pb-24 xlg:pt-10">
      <h1 className="text-h5-bold xlg:text-h3">CART({data.length})</h1>
      <div
        className={classcat([
          'mt-6 xlg:mt-10',
          'grid gap-6 xlg:grid-cols-[1fr_theme(spacing[71])] xlg:gap-8',
        ])}
      >
        <Show when={data.length === 0}>
          <NoData />
        </Show>
        <Show when={data.length}>
          <div className="grid h-max gap-4 rounded-lg bg-secondary-200 xlg:gap-6 xlg:p-6">
            {data.map((item) => (
              <CartItemCard key={item.listingId} value={item} onClickRemove={_handleRemoveItem} />
            ))}
          </div>
        </Show>

        <div>
          <div className="rounded-[10px] bg-secondary-200 p-4 xlg:p-6">
            <p className="text-center text-body2 xlg:text-h6">
              Subtotal ({data.length} items): {totalPrices} BUSD
            </p>
            <Button as={Link} href="/marketplace/cart/checkout" className="btnlg mt-9">
              Proceed to checkout
            </Button>
          </div>
          <HomeAdvVertical
            className="relative h-auto w-full py-8 ow:top-6 ow:px-15 xl:grid"
            btnClasses="ow:static mt-6.25"
          />
        </div>
      </div>
      <div className="mt-6 xlg:hidden">
        <HomeAdvHorizontal />
      </div>
    </section>
  );
}
