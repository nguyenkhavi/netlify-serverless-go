export default function VerifyIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 38 38"
      color="#19CA9B"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 1.584L4.75 7.917v9.5c0 8.788 6.08 17.005 14.25 19 8.17-1.995 14.25-10.212 14.25-19v-9.5L19 1.584zm-3.167 25.333L9.5 20.584l2.232-2.232 4.101 4.084 10.434-10.434 2.233 2.249-12.667 12.666z"
      ></path>
    </svg>
  );
}
