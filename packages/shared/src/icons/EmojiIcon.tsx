export default function EmojiIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="16"
      width="17"
      fill="none"
      viewBox="0 0 17 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.492 0C4.076 0 .5 3.584.5 8s3.576 8 7.992 8c4.424 0 8.008-3.584 8.008-8s-3.584-8-8.008-8ZM5.7 4.8c.664 0 1.2.536 1.2 1.2 0 .664-.536 1.2-1.2 1.2-.664 0-1.2-.536-1.2-1.2 0-.664.536-1.2 1.2-1.2Zm2.8 8c-1.824 0-3.376-1.328-4-3.2h8c-.624 1.872-2.176 3.2-4 3.2Zm2.8-5.6c-.664 0-1.2-.536-1.2-1.2 0-.664.536-1.2 1.2-1.2.664 0 1.2.536 1.2 1.2 0 .664-.536 1.2-1.2 1.2Z"
        fill="url(#paint0_linear_5134_29944)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5134_29944"
          gradientUnits="userSpaceOnUse"
          x1="0.5"
          x2="16.5"
          y1="8.00262"
          y2="8.00262"
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
