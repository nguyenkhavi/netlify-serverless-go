export default function CrossIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="20"
      width="20"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      color="white"
      {...props}
    >
      <path
        d="m14.06 5.94-8.12 8.12m0-8.12 8.12 8.12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
    </svg>
  );
}
