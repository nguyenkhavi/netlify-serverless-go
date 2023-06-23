export default function UserProfileIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        fill="currentColor"
        d="M12.143 12.887a5.34 5.34 0 10-5.33-5.33 5.33 5.33 0 005.33 5.33zm0-9.25a3.92 3.92 0 110 7.84 3.92 3.92 0 010-7.84zM12.14 14.668c-2.121 0-4.156.712-5.656 1.979-1.5 1.267-2.343 2.985-2.343 4.777 0 .414.18.752.67.752.49 0 .68-.338.68-.752.084-1.466.812-2.853 2.042-3.892 1.229-1.038 2.871-1.652 4.608-1.724 1.736.072 3.379.686 4.608 1.724 1.229 1.039 1.957 2.426 2.042 3.892 0 .414.18.752.67.752.49 0 .68-.338.68-.752 0-1.792-.843-3.51-2.343-4.777-1.5-1.267-3.536-1.979-5.657-1.979z"
      ></path>
    </svg>
  );
}

export function UserProfileActiveIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        fill="url(#paint0_linear_5790_35118)"
        d="M11.945 13.23c-4.327.391-7.501 3.924-7.444 8.269v.22c0 .84.274 1.522 1.115 1.522S6.65 22.56 6.65 21.72v-.282c-.045-2.667 2.166-5.867 5.344-6.095 4.151-.418 6.018 2.58 6.294 5.372.017.166.025.331.025.497v.508c0 .84.314 1.522 1.156 1.522.84 0 1.033-.681 1.033-1.522v-.506c-.005-4.49-3.527-8.005-8.018-8-.179 0-.358.006-.538.017z"
      ></path>
      <path
        fill="url(#paint1_linear_5790_35118)"
        d="M12.498 11.58a5.225 5.225 0 100-10.45 5.225 5.225 0 000 10.45zm0-8.45a3.225 3.225 0 110 6.45 3.225 3.225 0 010-6.45z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5790_35118"
          x1="4.5"
          x2="20.501"
          y1="18.229"
          y2="18.229"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_5790_35118"
          x1="7.273"
          x2="17.722"
          y1="6.357"
          y2="6.357"
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
