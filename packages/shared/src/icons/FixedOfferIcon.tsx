export default function FixedOfferIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="30"
      width="30"
      fill="none"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m26.762 14.475-11.25-11.25A2.484 2.484 0 0 0 13.75 2.5H5A2.507 2.507 0 0 0 2.5 5v8.75c0 .688.275 1.313.737 1.775l11.25 11.25c.45.45 1.075.725 1.763.725s1.313-.275 1.762-.738l8.75-8.75c.463-.45.738-1.075.738-1.762 0-.688-.288-1.325-.738-1.775ZM16.25 25.012 5 13.75V5h8.75v-.013L25 16.238l-8.75 8.776Z"
        fill="url(#paint0_linear_4474_126487)"
      />
      <path
        d="M8.125 10a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z"
        fill="url(#paint1_linear_4474_126487)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4474_126487"
          gradientUnits="userSpaceOnUse"
          x1="2.5"
          x2="27.5"
          y1="15.0041"
          y2="15.0041"
        >
          <stop stopColor="#3EDEB5" />
          <stop offset="0.16" stopColor="#47DEB8" />
          <stop offset="0.44" stopColor="#61DFBE" />
          <stop offset="0.78" stopColor="#8AE0C9" />
          <stop offset="0.99" stopColor="#A7E1D1" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4474_126487"
          gradientUnits="userSpaceOnUse"
          x1="6.25"
          x2="10"
          y1="8.12561"
          y2="8.12561"
        >
          <stop stopColor="#3EDEB5" />
          <stop offset="0.16" stopColor="#47DEB8" />
          <stop offset="0.44" stopColor="#61DFBE" />
          <stop offset="0.78" stopColor="#8AE0C9" />
          <stop offset="0.99" stopColor="#A7E1D1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
