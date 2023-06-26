function FollowedIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      {...props}
    >
      <g>
        <mask
          id="mask0_5218_106930"
          style={{ maskType: 'alpha' }}
          width="24"
          height="25"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path fill="#D9D9D9" d="M0 0.5H24V24.5H0z"></path>
        </mask>
        <g mask="url(#mask0_5218_106930)">
          <g>
            <path
              fill="url(#paint0_linear_5218_106930)"
              d="M15.523 21.5a.8.8 0 01-.735-.488.789.789 0 01-.061-.303c0-1.47-.587-2.88-1.63-3.919a5.582 5.582 0 00-3.938-1.623 5.582 5.582 0 00-3.937 1.623 5.528 5.528 0 00-1.631 3.919.79.79 0 01-.795.774A.798.798 0 012 20.71c0-3.934 3.207-7.125 7.159-7.125s7.159 3.19 7.159 7.125a.79.79 0 01-.795.791zM9.159 12a4.79 4.79 0 01-2.652-.8A4.755 4.755 0 014.75 9.068 4.73 4.73 0 015.784 3.89a4.794 4.794 0 015.201-1.03c.873.36 1.618.969 2.142 1.75a4.733 4.733 0 01-.593 5.998A4.784 4.784 0 019.159 12zm0-7.917c-.63 0-1.244.186-1.768.534A3.153 3.153 0 006.91 9.49a3.187 3.187 0 003.468.686 3.18 3.18 0 001.428-1.166 3.156 3.156 0 00-.396-3.998 3.19 3.19 0 00-2.25-.928z"
            ></path>
            <path
              fill="url(#paint1_linear_5218_106930)"
              d="M19.816 10.434l-2.913 2.908-1.562-1.62a.694.694 0 00-.755-.193.695.695 0 00-.416.896.693.693 0 00.17.256l1.603 1.662a1.301 1.301 0 00.935.415h.023a1.307 1.307 0 00.93-.383l2.971-2.957a.694.694 0 00-.494-1.18.7.7 0 00-.492.196z"
            ></path>
          </g>
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_5218_106930"
          x1="2"
          x2="16.318"
          y1="12.003"
          y2="12.003"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_5218_106930"
          x1="14.125"
          x2="21"
          y1="12.499"
          y2="12.499"
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

export default FollowedIcon;
