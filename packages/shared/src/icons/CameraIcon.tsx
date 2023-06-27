export default function CameraIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      fill="none"
      viewBox="0 0 14 15"
      color="#3EDEB5"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.56 9.27a1.748 1.748 0 100-3.497 1.748 1.748 0 000 3.496z"
      ></path>
      <path
        fill="currentColor"
        d="M4.917 2.059l-1 1.092h-1.73c-.602 0-1.093.492-1.093 1.092v6.555c0 .6.491 1.092 1.092 1.092h8.74c.6 0 1.092-.491 1.092-1.092V4.243c0-.6-.492-1.092-1.092-1.092H9.194l-1-1.092H4.918zm1.639 8.193a2.732 2.732 0 010-5.462 2.732 2.732 0 010 5.462z"
      ></path>
    </svg>
  );
}

export function CameraGradientIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
          fill="url(#paint0_linear_5949_13210)"
          d="M12.497 15.441a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z"
        ></path>
        <path
          fill="url(#paint1_linear_5949_13210)"
          d="M9.5 2.24l-1.83 2H4.5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_5949_13210"
          x1="9.297"
          x2="15.697"
          y1="12.242"
          y2="12.242"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_5949_13210"
          x1="2.5"
          x2="22.5"
          y1="11.243"
          y2="11.243"
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
