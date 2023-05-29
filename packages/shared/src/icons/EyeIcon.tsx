export default function EyeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M4 4l16 16m-6-5.764A3 3 0 019.764 10m9.844 5.608a22.453 22.453 0 001.522-1.461 3.085 3.085 0 000-4.294C19.174 7.795 15.816 5 12 5c-.891 0-1.758.153-2.587.413M6.5 6.803c-1.459.931-2.702 2.074-3.63 3.05a3.085 3.085 0 000 4.294C4.825 16.205 8.184 19 12 19c1.868 0 3.627-.67 5.165-1.596"
      ></path>
    </svg>
  );
}
