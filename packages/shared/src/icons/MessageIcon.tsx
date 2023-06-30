function MessageIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        d="M7.143 8a.857.857 0 101.714 0 .857.857 0 00-1.714 0zm3.571 0a.857.857 0 101.715 0 .857.857 0 00-1.715 0zM3.571 8a.857.857 0 101.715 0A.857.857 0 003.57 8zM15.38 4.9A8.005 8.005 0 0011.1.621 7.962 7.962 0 008 0h-.036A7.981 7.981 0 000 8.037c.006 1.24.3 2.462.857 3.57v2.714a.822.822 0 00.822.822h2.716a8.025 8.025 0 003.57.857h.037c1.07 0 2.107-.207 3.084-.613a7.937 7.937 0 002.55-1.7A7.98 7.98 0 0016 8.035a7.97 7.97 0 00-.621-3.135zm-2.699 7.821A6.608 6.608 0 018 14.643h-.03a6.668 6.668 0 01-3.091-.777l-.15-.08H2.214V11.27l-.08-.15a6.666 6.666 0 01-.777-3.09A6.602 6.602 0 013.28 3.32 6.593 6.593 0 017.97 1.357h.03a6.611 6.611 0 014.7 1.945 6.61 6.61 0 011.945 4.728 6.617 6.617 0 01-1.966 4.691z"
      ></path>
    </svg>
  );
}

export default MessageIcon;