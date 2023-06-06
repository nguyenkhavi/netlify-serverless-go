export default function PenIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      fill="none"
      viewBox="0 0 15 16"
      {...props}
    >
      <path
        fill="url(#paint0_linear_4479_121820)"
        d="M.735 12.437A2.509 2.509 0 000 14.211v1.288h1.288a2.51 2.51 0 001.773-.736l8.37-8.368-2.327-2.327-8.369 8.37z"
      ></path>
      <path
        fill="url(#paint1_linear_4479_121820)"
        d="M14.518.982a1.644 1.644 0 00-2.327 0l-2.199 2.2 2.326 2.326 2.2-2.199a1.644 1.644 0 000-2.327z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_4479_121820"
          x1="11.121"
          x2="0"
          y1="9.785"
          y2="9.785"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_4479_121820"
          x1="14.865"
          x2="9.992"
          y1="3.005"
          y2="3.005"
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
