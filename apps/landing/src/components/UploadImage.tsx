'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import ImageIcon from '_@shared/icons/ImageIcon';
const UploadImage = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isValid = ['image/*'].includes(file.type);

    if (!isValid) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result) return;
      console.log('result', reader.result.toString());
    };
  };

  return (
    <div
      className={classcat([
        'grid h-32.5 place-items-center',
        'rounded-md border-[2px] border-dashed border-text-50',
        'relative',
        className,
      ])}
      {...props}
    >
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
