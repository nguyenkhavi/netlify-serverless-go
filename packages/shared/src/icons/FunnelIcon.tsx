function FunnelIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <g clipPath="url(#clip0_5949_27478)">
        <path
          fill="#fff"
          fillOpacity="0.4"
          d="M14.445 5.885H1.79a.703.703 0 010-1.406h12.656a.703.703 0 010 1.406zm-2.343 3.281h-7.97a.703.703 0 010-1.406h7.97a.703.703 0 010 1.406zm-2.813 3.282H6.945a.703.703 0 010-1.407H9.29a.703.703 0 010 1.407z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_5949_27478">
          <path fill="#fff" d="M0 0H15V15H0z" transform="translate(.617 .963)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default FunnelIcon;
