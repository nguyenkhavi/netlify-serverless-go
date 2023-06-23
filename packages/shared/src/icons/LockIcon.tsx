export default function LockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="24"
      fill="none"
      viewBox="0 0 16 20"
      color="#A2A4A7"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14.167 7.797V6.611a5.833 5.833 0 00-11.667 0v1.186A4.167 4.167 0 000 11.611v5a4.172 4.172 0 004.167 4.166H12.5a4.171 4.171 0 004.167-4.166v-5a4.167 4.167 0 00-2.5-3.814zm-10-1.186a4.167 4.167 0 118.333 0v.833H4.167v-.833zM15 16.61a2.5 2.5 0 01-2.5 2.5H4.167a2.5 2.5 0 01-2.5-2.5v-5a2.5 2.5 0 012.5-2.5H12.5a2.5 2.5 0 012.5 2.5v5z"
      ></path>
      <path
        fill="currentColor"
        d="M8.333 12.223a.834.834 0 00-.833.833v1.667a.833.833 0 001.667 0v-1.667a.833.833 0 00-.834-.833z"
      ></path>
    </svg>
  );
}

export function LockActiveIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        <path
          fill="url(#paint0_linear_5790_35022)"
          d="M17.838 9.26V8.074a5.833 5.833 0 10-11.666 0V9.26a4.166 4.166 0 00-2.5 3.814v5a4.172 4.172 0 004.167 4.166h8.333a4.172 4.172 0 004.166-4.166v-5a4.166 4.166 0 00-2.5-3.814zm-10-1.186a4.167 4.167 0 018.334 0v.833H7.839v-.833zm10.834 10a2.5 2.5 0 01-2.5 2.5H7.839a2.5 2.5 0 01-2.5-2.5v-5a2.5 2.5 0 012.5-2.5h8.333a2.5 2.5 0 012.5 2.5v5z"
        ></path>
        <path
          fill="url(#paint1_linear_5790_35022)"
          d="M12.005 13.906a.833.833 0 00-.833.834v1.666a.833.833 0 101.666 0V14.74a.834.834 0 00-.833-.834z"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_5790_35022"
          x1="19.888"
          x2="3.672"
          y1="12.243"
          y2="12.243"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_5790_35022"
          x1="12.793"
          x2="11.172"
          y1="15.573"
          y2="15.573"
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
