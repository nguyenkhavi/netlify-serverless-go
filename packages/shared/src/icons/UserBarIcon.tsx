export default function UserBarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="21"
      fill="none"
      viewBox="0 0 24 21"
      color="#A2A4A7"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21.982 9.775v2.444H10.984V9.775m10.998-4.887v2.444H10.984V4.888M21.982 0v2.444H10.984V0h10.998zM5.654 11.754a5.42 5.42 0 014.931 5.47v.143a.993.993 0 01-1.985 0v-.183a3.41 3.41 0 00-2.978-3.441 3.313 3.313 0 00-3.64 3.293v.331a.993.993 0 01-1.985 0v-.33a5.3 5.3 0 015.657-5.283zM5.287 10.414a3.97 3.97 0 110-7.941 3.97 3.97 0 010 7.941zm0-5.956a1.985 1.985 0 100 3.97 1.985 1.985 0 000-3.97z"
      ></path>
    </svg>
  );
}

export function UserBarActiveIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        fill="url(#paint0_linear_5790_35816)"
        d="M23.74 13.346v2.444H12.742v-2.444M23.74 8.458v2.444H12.742V8.458M23.74 3.57v2.444H12.742V3.57H23.74z"
      ></path>
      <path
        fill="url(#paint1_linear_5790_35816)"
        d="M7.412 15.325a5.42 5.42 0 014.931 5.47v.143a.993.993 0 01-1.985 0v-.184a3.41 3.41 0 00-2.978-3.44 3.313 3.313 0 00-3.64 3.293v.33a.993.993 0 01-1.985 0v-.33a5.3 5.3 0 015.657-5.282z"
      ></path>
      <path
        fill="url(#paint2_linear_5790_35816)"
        d="M7.053 13.983a3.97 3.97 0 110-7.941 3.97 3.97 0 010 7.941zm0-5.956a1.985 1.985 0 100 3.971 1.985 1.985 0 000-3.97z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5790_35816"
          x1="12.742"
          x2="23.74"
          y1="9.682"
          y2="9.682"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_5790_35816"
          x1="12.344"
          x2="1.755"
          y1="18.622"
          y2="18.622"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_5790_35816"
          x1="11.023"
          x2="3.082"
          y1="10.014"
          y2="10.014"
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
