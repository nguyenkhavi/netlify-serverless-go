export default function ImageArtIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      height="17"
      width="17"
      fill="none"
      viewBox="0 0 17 17"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.92 8.602a2 2 0 0 0-2.829 0l-4.56 4.56a3.327 3.327 0 0 0 3.308 3.082h9.334c.653 0 1.291-.193 1.835-.555L7.92 8.602Z"
        fill="url(#image_art_icon_1)"
      />
      <path
        d="M12.497 5.579a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667Z"
        fill="url(#image_art_icon_2)"
      />
      <path
        d="M13.167.244H3.833A3.337 3.337 0 0 0 .5 3.577v7.725l3.643-3.643a3.333 3.333 0 0 1 4.714 0l7.088 7.087a3.312 3.312 0 0 0 .555-1.835V3.577A3.337 3.337 0 0 0 13.167.244ZM12.5 6.911a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333Z"
        fill="url(#image_art_icon_3)"
      />
      <defs>
        <linearGradient
          id="image_art_icon_1"
          gradientUnits="userSpaceOnUse"
          x1="0.53125"
          x2="15.0079"
          y1="12.1314"
          y2="12.1314"
        >
          <stop stopColor="#3EDEB5" />
          <stop offset="0.16" stopColor="#47DEB8" />
          <stop offset="0.44" stopColor="#61DFBE" />
          <stop offset="0.78" stopColor="#8AE0C9" />
          <stop offset="0.99" stopColor="#A7E1D1" />
        </linearGradient>
        <linearGradient
          id="image_art_icon_2"
          gradientUnits="userSpaceOnUse"
          x1="11.1641"
          x2="13.8307"
          y1="4.24588"
          y2="4.24588"
        >
          <stop stopColor="#3EDEB5" />
          <stop offset="0.16" stopColor="#47DEB8" />
          <stop offset="0.44" stopColor="#61DFBE" />
          <stop offset="0.78" stopColor="#8AE0C9" />
          <stop offset="0.99" stopColor="#A7E1D1" />
        </linearGradient>
        <linearGradient
          id="image_art_icon_3"
          gradientUnits="userSpaceOnUse"
          x1="0.5"
          x2="16.5"
          y1="7.49751"
          y2="7.49751"
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
