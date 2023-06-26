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

export function BareShareIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#5D6165"
        d="M13.333 11.315c-.675 0-1.28.241-1.742.619L5.253 8.599c.045-.185.08-.37.08-.563 0-.193-.035-.378-.08-.562L11.52 4.17c.48.402 1.111.65 1.813.65.708 0 1.386-.253 1.886-.705A2.3 2.3 0 0016 2.41a2.3 2.3 0 00-.781-1.705A2.817 2.817 0 0013.333 0c-.707 0-1.385.254-1.885.706a2.3 2.3 0 00-.781 1.705c0 .193.035.378.08.562L4.48 6.276a2.813 2.813 0 00-1.813-.65c-.708 0-1.386.253-1.886.705A2.3 2.3 0 000 8.036a2.3 2.3 0 00.781 1.705c.5.452 1.178.706 1.886.706.702 0 1.333-.25 1.813-.65l6.329 3.334a2.072 2.072 0 00-.071.53c0 1.294 1.164 2.339 2.595 2.339 1.431 0 2.596-1.045 2.596-2.338 0-.623-.274-1.22-.76-1.66a2.742 2.742 0 00-1.836-.687z"
      ></path>
    </svg>
  );
}
