export default function GridIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      fill="none"
      viewBox="0 0 19 19"
      color="#8B8E92"
      {...props}
    >
      <rect width="8.313" height="8.313" x="0.57" fill="currentColor" rx="1.214"></rect>
      <rect width="8.313" height="8.313" x="11.258" fill="currentColor" rx="1.214"></rect>
      <rect width="8.313" height="8.313" x="0.57" y="10.685" fill="currentColor" rx="1.214"></rect>
      <rect
        width="8.313"
        height="8.313"
        x="11.258"
        y="10.685"
        fill="currentColor"
        rx="1.214"
      ></rect>
    </svg>
  );
}
