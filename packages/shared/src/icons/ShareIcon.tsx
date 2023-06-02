export default function ShareIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="url(#paint0_linear_3962_115799)"
        d="M12.02 10.608c-.573 0-1.085.226-1.477.58L5.171 8.06c.038-.173.068-.346.068-.527 0-.18-.03-.354-.068-.527l5.312-3.097a2.25 2.25 0 003.135-.052A2.26 2.26 0 109.759 2.26c0 .181.03.354.068.528L4.516 5.884a2.25 2.25 0 00-3.135.052 2.26 2.26 0 001.598 3.858 2.25 2.25 0 001.537-.61L9.88 12.31a2.14 2.14 0 00-.06.498c0 1.213.987 2.192 2.2 2.192a2.196 2.196 0 100-4.392z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_3962_115799"
          x1="0.719"
          x2="14.28"
          y1="7.502"
          y2="7.502"
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
