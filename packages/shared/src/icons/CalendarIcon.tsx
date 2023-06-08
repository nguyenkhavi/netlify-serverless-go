export default function CalendarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      color="#FFF"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.75 1.25v1.5h6.5v-1.5h1.5v1.5h3.75c.966 0 1.75.784 1.75 1.75V20a1.75 1.75 0 01-1.75 1.75h-17A1.75 1.75 0 011.75 20V4.5c0-.966.784-1.75 1.75-1.75h3.75v-1.5h1.5zm6.5 3v2.5h1.5v-2.5h3.75a.25.25 0 01.25.25v4.25H3.25V4.5a.25.25 0 01.25-.25h3.75v2.5h1.5v-2.5h6.5zm5.5 6H3.25V20c0 .138.112.25.25.25h17a.25.25 0 00.25-.25v-9.75z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
