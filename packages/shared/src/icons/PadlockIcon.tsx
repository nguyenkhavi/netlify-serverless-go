export default function PadlockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="21"
      width="16"
      fill="none"
      viewBox="0 0 16 21"
      xmlns="http://www.w3.org/2000/svg"
      color="#19CA9B"
      {...props}
    >
      <path
        d="M2 7h9V5c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 8 2c-.833 0-1.542.292-2.125.875A2.893 2.893 0 0 0 5 5H3c0-1.383.488-2.563 1.463-3.538C5.438.487 6.617-.001 8 0c1.383 0 2.563.488 3.538 1.463C12.513 2.438 13.001 3.617 13 5v2h1c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v10c0 .55-.196 1.021-.588 1.413A1.922 1.922 0 0 1 14 21H2c-.55 0-1.021-.196-1.413-.588A1.922 1.922 0 0 1 0 19V9c0-.55.196-1.021.588-1.413A1.922 1.922 0 0 1 2 7Zm0 12h12V9H2v10Zm6-3c.55 0 1.021-.196 1.413-.588.392-.392.588-.863.587-1.412 0-.55-.196-1.021-.588-1.413A1.922 1.922 0 0 0 8 12c-.55 0-1.021.196-1.413.588A1.922 1.922 0 0 0 6 14c0 .55.196 1.021.588 1.413.392.392.863.588 1.412.587Z"
        fill="currentColor"
      />
    </svg>
  );
}