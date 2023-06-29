// export default function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
//   return (
//     <svg
//       height="25"
//       width="25"
//       fill="none"
//       viewBox="0 0 25 25"
//       xmlns="http://www.w3.org/2000/svg"
//       color="#19CFA0"
//       {...props}
//     >
//       <path
//         d="M16.027 12.015c0 .133-.025.262-.075.388a.904.904 0 0 1-.2.312l-4.6 4.6a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275.948.948 0 0 1-.275-.7c0-.284.091-.517.275-.7l3.9-3.9-3.9-3.9a.948.948 0 0 1-.275-.7c0-.283.091-.517.275-.7a.948.948 0 0 1 .7-.275c.283 0 .516.092.7.275l4.6 4.6c.1.1.17.208.213.325.042.117.062.242.062.375Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }

export default function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#19CFA0"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.15441 4.93945L15.6847 11.4698C15.9776 11.7627 15.9776 12.2375 15.6847 12.5304L9.15441 19.0608L8.09375 18.0001L14.0938 12.0001L8.09375 6.00011L9.15441 4.93945Z"
        fill="currentColor"
      />
    </svg>
  );
}
