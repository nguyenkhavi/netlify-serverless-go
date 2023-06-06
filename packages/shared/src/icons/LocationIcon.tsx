export default function LocationIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="20"
      fill="none"
      viewBox="0 0 14 20"
      color="#8B8E92"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM7 0a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z"
      ></path>
    </svg>
  );
}
