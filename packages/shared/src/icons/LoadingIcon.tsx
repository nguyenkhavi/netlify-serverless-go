//THIRD PARTY MODULES
import classcat from 'classcat';

export default function LoadingIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      color="#FFF"
      className={classcat(['animate-spin', className])}
      {...props}
    >
      <path
        d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM5 12a7 7 0 1 0 14 0 7 7 0 0 0-14 0Z"
        fill="currentColor"
        className="opacity-25"
      />
      <path
        d="M17.03 18.86c.49.66 1.43.81 2.02.23A10 10 0 0 0 5.25 4.62c-.61.56-.5 1.52.14 2.04s1.58.4 2.23-.12a7 7 0 0 1 9.62 10.1c-.54.62-.7 1.55-.21 2.22Z"
        fill="currentColor"
      />
    </svg>
  );
}
