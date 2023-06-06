export default function CameraIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      fill="none"
      viewBox="0 0 14 15"
      color="#3EDEB5"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.56 9.27a1.748 1.748 0 100-3.497 1.748 1.748 0 000 3.496z"
      ></path>
      <path
        fill="currentColor"
        d="M4.917 2.059l-1 1.092h-1.73c-.602 0-1.093.492-1.093 1.092v6.555c0 .6.491 1.092 1.092 1.092h8.74c.6 0 1.092-.491 1.092-1.092V4.243c0-.6-.492-1.092-1.092-1.092H9.194l-1-1.092H4.918zm1.639 8.193a2.732 2.732 0 010-5.462 2.732 2.732 0 010 5.462z"
      ></path>
    </svg>
  );
}
