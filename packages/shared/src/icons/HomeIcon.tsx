export default function HomeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.03 4.54a1.31 1.31 0 00-1.78 0l-7.11 6.47v7.025c0 .572.225 1.12.624 1.525.4.404.942.631 1.507.631h11.74a2.127 2.127 0 001.503-.634 2.18 2.18 0 00.627-1.522V11.01l-7.11-6.47zm1.11 14.295h-4v-3.402c0-.537.211-1.051.586-1.431a1.987 1.987 0 012.828 0c.376.38.587.894.587 1.431v3.402zm4.67-.81a.818.818 0 01-.234.573.8.8 0 01-.565.237h-2.54v-3.402c0-.894-.351-1.751-.976-2.383a3.31 3.31 0 00-2.354-.988 3.31 3.31 0 00-2.355.988 3.392 3.392 0 00-.975 2.383v3.392H6.27a.795.795 0 01-.566-.237.815.815 0 01-.234-.573v-6.398l6.67-6.074 6.67 6.074v6.408z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5119_6635"
          x1="19.708"
          x2="4.141"
          y1="12.194"
          y2="12.194"
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
