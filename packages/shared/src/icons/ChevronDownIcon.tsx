export default function ChevronDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      color="#FFF"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.997 14.976c-.133 0-.263-.025-.388-.075a.904.904 0 01-.312-.2l-4.6-4.6a.948.948 0 01-.275-.7c0-.284.092-.517.275-.7a.948.948 0 01.7-.275c.283 0 .517.091.7.275l3.9 3.9 3.9-3.9a.948.948 0 01.7-.275c.283 0 .516.091.7.275a.948.948 0 01.275.7.948.948 0 01-.275.7l-4.6 4.6c-.1.1-.208.17-.325.213a1.084 1.084 0 01-.375.062z"
      ></path>
    </svg>
  );
}

export function ChevronDownFillIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <g>
        <path
          fill="#B9BABD"
          d="M11.367 15.117l-2.6-2.6c-.317-.316-.388-.679-.212-1.087.175-.408.487-.612.937-.613h5.15c.45 0 .762.205.938.613.175.409.104.771-.213 1.087l-2.6 2.6c-.1.1-.209.175-.325.225a.942.942 0 01-.375.075.941.941 0 01-.375-.075 1.038 1.038 0 01-.325-.225z"
        ></path>
      </g>
    </svg>
  );
}
