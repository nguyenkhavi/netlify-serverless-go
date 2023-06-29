export default function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      color="#D0D2D3"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14.778 2.992a1.25 1.25 0 10-1.767-1.768l-5.01 5.008-5.008-5.008a1.25 1.25 0 10-1.767 1.767L6.231 8l-5.008 5.008a1.25 1.25 0 001.766 1.767l5.012-5.009 5.008 5.01a1.25 1.25 0 001.767-1.766L9.771 8l5.007-5.009z"
      ></path>
    </svg>
  );
}

export function CloseBigIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="40"
      width="40"
      fill="none"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m14.11 25.89 11.786-11.783m-11.787 0 11.787 11.784"
        stroke="#D0D2D3"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
