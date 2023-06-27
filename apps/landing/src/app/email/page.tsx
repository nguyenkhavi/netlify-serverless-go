'use client';

//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

export default function Page() {
  const onResend = async () => {
    const res = await fetch('http://localhost:2040/api/resend', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: 'Teddy',
        email: 'vu.dinh@sens-vn.com',
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    console.log('🚀 ~ file: page.tsx:21 ~ sendEmail ~ data:', data);
  };

  const onSendgrid = async () => {
    const res = await fetch('http://localhost:2040/api/sendgrid');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    console.log('🚀 ~ file: page.tsx:37 ~ onSendgrid ~ data:', data);
  };

  return (
    <div className="px-[--px] py-10">
      <h1>Email</h1>

      <Button className="mt-10 ow:w-fit" onClick={onResend}>
        Resend
      </Button>

      <Button className="mt-10 ow:w-fit" onClick={onSendgrid}>
        Sendgrid
      </Button>
    </div>
  );
}
