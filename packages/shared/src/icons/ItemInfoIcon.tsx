export default function ItemInfoIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      color="url(#paint0_linear_2919_86176)"
      {...props}
    >
      <path
        d="M17 10c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7Zm0 12a5.001 5.001 0 1 1 0-10.002A5.001 5.001 0 0 1 17 22ZM2 20V3a1.003 1.003 0 0 1 1-1h7v6h8V6.59L11.41 0H3a3.009 3.009 0 0 0-3 3v19h9.52a9.113 9.113 0 0 1-.989-2h-6.53ZM12 3.41 14.59 6H12V3.41Zm6 11.156a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 2.867v2a1.001 1.001 0 1 1-2 0v-2a1 1 0 1 1 2 0Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="item_info_icon"
          gradientUnits="userSpaceOnUse"
          x1="0"
          x2="24"
          y1="12.0039"
          y2="12.0039"
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
