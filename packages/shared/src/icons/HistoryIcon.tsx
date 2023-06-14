export default function HistoryIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      color="url(#history_icon_1)"
      {...props}
    >
      <path
        d="M12 0a11.972 11.972 0 0 0-8 3.073V1a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h3a1 1 0 0 0 0-2H5a.854.854 0 0 1-.1-.021A9.987 9.987 0 1 1 2 12a1 1 0 1 0-2 0A12 12 0 1 0 12 0Z"
        fill="currentColor"
      />
      <path
        d="M12 6a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="history_icon_1"
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
        <linearGradient
          id="history_icon_2"
          gradientUnits="userSpaceOnUse"
          x1="11"
          x2="15.9877"
          y1="10.9955"
          y2="10.9955"
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
