export default function LikeColorIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="20"
      width="20"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.303 10.424c.328-.434.51-.965.51-1.518 0-.877-.49-1.707-1.28-2.17a1.321 1.321 0 0 0-.67-.181H11.18l.117-2.4a2.091 2.091 0 0 0-.576-1.551 2.082 2.082 0 0 0-1.522-.653 2.27 2.27 0 0 0-2.183 1.662L5.338 9.688H2.812a.624.624 0 0 0-.624.624v7.11c0 .346.279.625.624.625h11.745c.18 0 .355-.035.517-.106a2.511 2.511 0 0 0 1.424-3.035 2.513 2.513 0 0 0 .404-2.24c.328-.434.51-.965.51-1.518a2.67 2.67 0 0 0-.11-.724ZM3.593 16.64v-5.547h1.583v5.547H3.594Zm12.43-6.895-.427.371.271.496a1.115 1.115 0 0 1-.248 1.373l-.428.371.272.497a1.116 1.116 0 0 1-.248 1.373l-.428.37.272.497a1.11 1.11 0 0 1-.521 1.545H6.425V11.03l1.943-7.04a.861.861 0 0 1 .824-.632.694.694 0 0 1 .697.727l-.187 3.875h6.14c.348.213.563.572.563.945 0 .323-.14.627-.383.84Z"
        fill="url(#paint0_linear_3204_117738)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3204_117738"
          gradientUnits="userSpaceOnUse"
          x1="2.1875"
          x2="17.8125"
          y1="10.0017"
          y2="10.0017"
        >
          <stop stopColor="#3EDEB5" />
          <stop offset="0.16" stopColor="#47DEB8" />
          <stop offset="0.44" stopColor="#61DFBE" />
          <stop offset="0.78" stopColor="#8AE0C9" />
          <stop offset="0.99" stopColor="#A7E1D1" />
        </linearGradient>
      </defs>
    </svg>
  );
}