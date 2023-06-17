function SmileFaceIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="15"
      fill="none"
      viewBox="0 0 16 15"
      {...props}
    >
      <path
        fill="url(#paint0_linear_5361_20758)"
        d="M7.586 0C3.446 0 .094 3.36.094 7.5c0 4.14 3.352 7.5 7.492 7.5 4.148 0 7.508-3.36 7.508-7.5 0-4.14-3.36-7.5-7.508-7.5zM4.97 4.5c.622 0 1.125.503 1.125 1.125S5.59 6.75 4.969 6.75a1.123 1.123 0 01-1.125-1.125c0-.622.502-1.125 1.125-1.125zM7.594 12c-1.71 0-3.165-1.245-3.75-3h7.5c-.585 1.755-2.04 3-3.75 3zm2.625-5.25a1.124 1.124 0 01-1.125-1.125c0-.622.502-1.125 1.125-1.125.622 0 1.125.503 1.125 1.125S10.84 6.75 10.219 6.75z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5361_20758"
          x1="0.094"
          x2="15.094"
          y1="7.502"
          y2="7.502"
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

export default SmileFaceIcon;
