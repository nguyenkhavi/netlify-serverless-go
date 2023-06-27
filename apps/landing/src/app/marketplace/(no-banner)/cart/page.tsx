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
import Switch from '_@shared/components/conditions/Switch';
import CartItemSke from '_@landing/app/marketplace/(no-banner)/cart/components/CartItemSke';
import delay from '_@landing/utils/delay';

export default function CartPage() {
  const [data, setData] = useState<TDataCheckout[]>([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    delay(() => JSON.parse(window.localStorage.getItem('cart') || '[]') as TDataCheckout[], 500)
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <Switch.Root>
          <Switch.Case when={loading}>
            <div className="grid h-max gap-4 rounded-lg bg-secondary-200 xlg:gap-6 xlg:p-6">
              <CartItemSke />
              <CartItemSke />
            </div>
          </Switch.Case>
          <Switch.Case when={data.length === 0}>
            <NoData />
          </Switch.Case>
          <Show when={true}>
            <div className="grid h-max gap-4 rounded-lg bg-secondary-200 xlg:gap-6 xlg:p-6">
              {data.map((item) => (
                <CartItemCard key={item.listingId} value={item} onClickRemove={_handleRemoveItem} />
              ))}
            </div>
          </Show>
        </Switch.Root>

        <div>
          <div className="rounded-[10px] bg-secondary-200 p-4 xlg:p-6">
            <p className="text-center text-body2 xlg:text-h6">
              Subtotal ({data.length} items): {totalPrices} BUSD
            </p>
            <Button as={Link} href="/marketplace/checkout" className="btnlg mt-9">
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
