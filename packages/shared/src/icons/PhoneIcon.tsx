export default function PhoneIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 20h4v-1h-4v1Zm-3 3c-.55 0-1.02-.2-1.41-.59-.4-.39-.6-.86-.59-1.41V3c0-.55.2-1.02.59-1.41.39-.4.86-.6 1.41-.59h10c.55 0 1.02.2 1.41.59.4.39.6.86.59 1.41v18c0 .55-.2 1.02-.59 1.41-.39.4-.86.6-1.41.59H7Zm0-7h10V6H7v10Z"
        fill="url(#paint0_linear_3309_111547)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3309_111547"
          gradientUnits="userSpaceOnUse"
          x1="5"
          x2="19"
          y1="12.0036"
          y2="12.0036"
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

export function Phone2Icon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      color="#19CFA0"
      {...props}
    >
      <path
        d="M10 20h4v-1h-4v1Zm-3 3c-.55 0-1.02-.2-1.41-.59-.4-.39-.6-.86-.59-1.41V3c0-.55.2-1.02.59-1.41.39-.4.86-.6 1.41-.59h10c.55 0 1.02.2 1.41.59.4.39.6.86.59 1.41v18c0 .55-.2 1.02-.59 1.41-.39.4-.86.6-1.41.59H7Zm0-7h10V6H7v10Z"
        fill="currentColor"
      />
    </svg>
  );
}
