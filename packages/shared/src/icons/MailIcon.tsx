export default function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  const isColorDefault = props.color === undefined || props.color === 'default' ? true : false;

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
        fill={isColorDefault ? 'url(#paint0_linear_4053_117604)' : 'currentColor'}
        d="M17.404 5.19H6.878c-.996 0-1.95.352-2.654.976-.704.625-1.099 1.472-1.099 2.355v8c0 .884.395 1.732 1.098 2.358.704.626 1.658.98 2.655.982h10.526c.996-.003 1.95-.356 2.654-.982.703-.626 1.098-1.474 1.098-2.358v-8c0-.883-.395-1.73-1.099-2.355-.704-.624-1.658-.975-2.653-.975zM6.878 6.52h10.526c.449.003.888.123 1.26.348.37.224.658.542.824.913l-5.758 5.11a2.29 2.29 0 01-.732.434 2.503 2.503 0 01-1.726 0 2.29 2.29 0 01-.732-.434L4.793 7.78c.166-.37.454-.689.825-.913a2.46 2.46 0 011.26-.347zm10.526 12H6.878c-.598 0-1.171-.21-1.594-.585a1.893 1.893 0 01-.66-1.414v-7l4.857 4.31c.706.625 1.662.976 2.66.976.997 0 1.954-.35 2.66-.976l4.856-4.31v7c0 .53-.237 1.04-.66 1.414a2.406 2.406 0 01-1.593.586z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_4053_117604"
          x1="0.93"
          x2="16.93"
          y1="7.936"
          y2="7.936"
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

export function MailCheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="18"
      fill="none"
      viewBox="0 0 21 18"
      color="#19CA9B"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 15a6.995 6.995 0 0110-6.32V2c0-1.1-.9-2-2-2H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h8.08c-.05-.33-.08-.66-.08-1zM2 2l8 5 8-5v2l-8 5-8-5V2zm13.34 16l-3.54-3.54 1.41-1.41 2.12 2.12 4.24-4.24L21 12.34 15.34 18z"
      ></path>
    </svg>
  );
}
