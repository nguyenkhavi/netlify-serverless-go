export default function TrashCanIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="17"
      fill="none"
      viewBox="0 0 15 17"
      color="#E02222"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.25 2.833V1.417c0-.376-.158-.736-.44-1.002A1.546 1.546 0 009.75 0h-4.5c-.398 0-.78.15-1.06.415-.282.266-.44.626-.44 1.002v1.416H0V4.25h1.5v10.625c0 .564.237 1.104.659 1.503.422.398.994.622 1.591.622h7.5a2.32 2.32 0 001.591-.622c.422-.399.659-.94.659-1.503V4.25H15V2.833h-3.75zm-4.5 9.209h-1.5v-4.25h1.5v4.25zm3 0h-1.5v-4.25h1.5v4.25zm0-9.209h-4.5V1.417h4.5v1.416z"
      ></path>
    </svg>
  );
}
