function CommentIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
      {...props}
    >
      <path
        fill="#8B8E92"
        d="M8.008 2.75c3.31 0 6 2.69 6 6s-2.69 6-6 6h-6v-6c0-3.31 2.69-6 6-6zm-5 11h5c2.755 0 5-2.245 5-5s-2.245-5-5-5-5 2.245-5 5v5z"
      ></path>
    </svg>
  );
}

export default CommentIcon;

export function CommentActiveIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path fill="url(#paint0_linear_5538_108408)" d="M2 8v6h6a6 6 0 10-6-6z"></path>
      <defs>
        <linearGradient
          id="paint0_linear_5538_108408"
          x1="2"
          x2="13.993"
          y1="8"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
