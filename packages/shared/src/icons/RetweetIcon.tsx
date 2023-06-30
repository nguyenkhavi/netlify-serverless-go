function RetweetIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
      {...props}
    >
      <path
        fill="#8B8E92"
        d="M1.258 8.502a4.755 4.755 0 014.75-4.75h6.188l-.22-.22a.752.752 0 111.062-1.062l1.5 1.5a.751.751 0 010 1.063l-1.5 1.5a.751.751 0 11-1.062-1.063l.22-.218H6.008a3.254 3.254 0 00-3.25 3.25.75.75 0 11-1.5 0zm12.75-.75a.75.75 0 00-.75.75 3.254 3.254 0 01-3.25 3.25H3.821l.22-.22a.751.751 0 00-1.063-1.062l-1.5 1.5a.749.749 0 000 1.063l1.5 1.5a.751.751 0 001.063-1.063l-.22-.218h6.187a4.755 4.755 0 004.75-4.75.75.75 0 00-.75-.75z"
      ></path>
    </svg>
  );
}

export default RetweetIcon;