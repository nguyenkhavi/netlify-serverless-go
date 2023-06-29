// export default function ChevronLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
//   return (
//     <svg
//       height="25"
//       width="25"
//       fill="none"
//       viewBox="0 0 25 25"
//       xmlns="http://www.w3.org/2000/svg"
//       color="white"
//       {...props}
//     >
//       <path
//         d="M9.208 12.815c0-.133.025-.262.075-.388a.905.905 0 0 1 .2-.312l4.6-4.6a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7l-3.9 3.9 3.9 3.9a.949.949 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275l-4.6-4.6a.883.883 0 0 1-.213-.325 1.082 1.082 0 0 1-.062-.375Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }

export default function ChevronLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#FFF"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9044 6.00011L9.90441 12.0001L15.9044 18.0001L14.8438 19.0608L8.31342 12.5304C8.02053 12.2375 8.02053 11.7627 8.31342 11.4698L14.8438 4.93945L15.9044 6.00011Z"
        fill="currentColor"
      />
    </svg>
  );
}
