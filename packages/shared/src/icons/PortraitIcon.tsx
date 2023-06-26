export default function PortraitIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="25"
      width="25"
      fill="none"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.664 13.125c1.24 0 2.25-1.01 2.25-2.25s-1.01-2.25-2.25-2.25-2.25 1.01-2.25 2.25 1.01 2.25 2.25 2.25Zm4.5 4c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25v.75h9v-.75Zm2.5-13.25h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2Zm0 16h-14v-14h14v14Z"
        fill="url(#paint0_linear_5881_13442)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5881_13442"
          gradientUnits="userSpaceOnUse"
          x1="3.66406"
          x2="21.6641"
          y1="12.8779"
          y2="12.8779"
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
