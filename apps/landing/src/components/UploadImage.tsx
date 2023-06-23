'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
//SHARED
import ImageIcon from '_@shared/icons/ImageIcon';

type Props = React.ComponentProps<'div'> & {
  onChangeValue: (value: string) => void;
};

const UploadImage = ({ className, onChangeValue, ...props }: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isValid = file.type.startsWith('image/');
    if (!isValid) return;
    setImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result) return;
      const base64 = reader.result.toString();
      onChangeValue(base64);
    };
  };

  return (
    <div
      className={classcat([
        'grid h-32.5 place-items-center',
        'rounded-md border-[2px] border-dashed',
        image ? 'border-transparent' : 'border-text-50',
        'relative',
        className,
      ])}
      {...props}
    >
      {image && <img src={image} className="absolute inset-0 h-full w-full object-cover" alt="" />}
      <ImageIcon />

      <input
        type="file"
        accept="image/*"
        onChange={onChangeHandler}
        className="absolute inset-0 cursor-pointer select-none opacity-0"
      />
    </div>
  );
};

export default UploadImage;
