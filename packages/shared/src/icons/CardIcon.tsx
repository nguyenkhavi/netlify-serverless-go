export default function CardIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      {...props}
    >
      <path
        fill="url(#cart_icon_color)"
        d="M6.636 16.774a1.238 1.238 0 100-2.475 1.238 1.238 0 000 2.475z"
      ></path>
      <path
        fill="url(#cart_icon_color)"
        d="M18.195 6.063H5.804A3.464 3.464 0 002.34 9.527v6.696a3.465 3.465 0 003.464 3.465h12.391a3.464 3.464 0 003.465-3.465V9.527a3.465 3.465 0 00-3.465-3.464zm2.314 9.95a2.553 2.553 0 01-2.553 2.553H6.043a2.553 2.553 0 01-2.553-2.553v-5.106h17.02v5.106zM3.49 9.753A2.553 2.553 0 016.043 7.2h11.913a2.553 2.553 0 012.553 2.553H3.49z"
      ></path>
      <defs>
        <linearGradient
          id="cart_icon_color"
          x1="0"
          x2="20"
          y1="10.007"
          y2="10.007"
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
