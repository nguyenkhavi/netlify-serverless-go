export default function FeedbackIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      viewBox="0 0 24 25"
      color="#A2A4A7"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20 2.777H4c-1.1 0-1.99.9-1.99 2l-.01 18 4-4h14c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2v-4h2v4z"
      ></path>
    </svg>
  );
}
