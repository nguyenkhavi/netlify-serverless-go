function GlobalIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        fill={props.fill || '#B9BABD'}
        d="M1.368 9.166h3.651a11.933 11.933 0 001.95 5.921 6.67 6.67 0 01-5.602-5.92zm0-1.333a6.67 6.67 0 015.601-5.92 11.933 11.933 0 00-1.95 5.92H1.368zm13.266 0h-3.65a11.933 11.933 0 00-1.95-5.92 6.67 6.67 0 015.6 5.92zm0 1.333a6.67 6.67 0 01-5.6 5.921 11.933 11.933 0 001.95-5.92h3.651zm-8.28 0h3.294c-.11 1.8-.677 3.542-1.647 5.062a10.606 10.606 0 01-1.646-5.062zm0-1.333c.11-1.8.677-3.54 1.647-5.06.97 1.52 1.537 3.26 1.647 5.06H6.355z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_6226_109370"
          x1="1.367"
          x2="14.635"
          y1="8.502"
          y2="8.502"
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

export default GlobalIcon;
