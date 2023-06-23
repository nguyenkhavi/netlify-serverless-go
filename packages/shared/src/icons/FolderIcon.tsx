export default function FolderIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      fill="none"
      viewBox="0 0 19 17"
      color="#A2A4A7"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 5.901v7.917a3.964 3.964 0 01-3.958 3.958H3.958A3.964 3.964 0 010 13.818v-9.5A3.964 3.964 0 013.958.359h1.999c.368 0 .731.086 1.06.25L9.52 1.864c.11.054.231.081.354.08h5.168A3.964 3.964 0 0119 5.9zM1.583 4.318v.791h15.688a2.375 2.375 0 00-2.23-1.583H9.875A2.383 2.383 0 018.81 3.28L6.313 2.026a.807.807 0 00-.353-.083H3.96a2.375 2.375 0 00-2.378 2.375zm15.834 9.5V6.693H1.583v7.125a2.375 2.375 0 002.375 2.375h11.084a2.374 2.374 0 002.375-2.375z"
      ></path>
    </svg>
  );
}

export function FolderActiveIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        fill="url(#paint0_linear_5790_35761)"
        d="M21.984 9.405v7.917a3.965 3.965 0 01-3.958 3.958H6.943a3.964 3.964 0 01-3.959-3.958v-9.5a3.964 3.964 0 013.959-3.959H8.94c.368 0 .731.086 1.06.25l2.503 1.254c.11.054.231.081.354.08h5.168a3.964 3.964 0 013.958 3.958zM4.568 7.822v.791h15.687a2.375 2.375 0 00-2.229-1.583h-5.168a2.383 2.383 0 01-1.062-.246L9.298 5.53a.807.807 0 00-.354-.083H6.946a2.375 2.375 0 00-2.378 2.375zm15.833 9.5v-7.125H4.568v7.125a2.375 2.375 0 002.375 2.375h11.083a2.374 2.374 0 002.375-2.375z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5790_35761"
          x1="2.984"
          x2="21.984"
          y1="12.575"
          y2="12.575"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
