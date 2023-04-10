import ChevronIcon from '_@landing/components/icons/Chevron'

export interface ICollapseProps {
  label?: string
  title: string
  content: string | string[]
}

export default function Collapse({ label, title, content }: ICollapseProps) {
  return (
    <details className="group cursor-pointer">
      <summary className="flex w-full justify-between border-b-[1px] border-solid border-foundation-black-100 pb-6">
        <span className="mr-6 flex ">
          {label && (
            <span
              className={`mr-6 w-4 text-foundation-black-100 transition-all group-open:text-foundation-orange-500`}
            >
              {label}
            </span>
          )}
          <span className=" text-start text-foundation-black-500">{title}</span>
        </span>
        <span>
          <ChevronIcon className="rotate-180 transition-all group-open:rotate-0" />
        </span>
      </summary>

      <div
        className={`mt-6 text-14 text-foundation-black-300 transition-all ${label ? 'ml-10' : ''}`}
      >
        {typeof content === 'string'
          ? content
          : content.map((item, index) => <p key={index}>{item}</p>)}
      </div>
    </details>
  )
}

// export default function Collapse({ label, title, content }: ICollapseProps) {
//   return (
//     <Disclosure>
//       {({ open }) => (
//         <>
//           <Disclosure.Button className="flex w-full justify-between border-b-[1px] border-solid border-foundation-black-100 pb-6">
//             <div className="mr-6 flex">
//               {label && (
//                 <span
//                   className={`mr-6 transition-all ${
//                     open
//                       ? "text-foundation-orange-500"
//                       : "text-foundation-black-100"
//                   }`}
//                 >
//                   {label}
//                 </span>
//               )}
//               <span className=" text-start text-foundation-black-500">
//                 {title}
//               </span>
//             </div>
//             <div>
//               <Cheveron direction={open ? "up" : "down"} />
//             </div>
//           </Disclosure.Button>
//           <Transition
//             enter="transition duration-100 ease-out"
//             enterFrom="transform scale-95 opacity-0"
//             enterTo="transform scale-100 opacity-100"
//             leave="transition duration-75 ease-out"
//             leaveFrom="transform scale-100 opacity-100"
//             leaveTo="transform scale-95 opacity-0"
//           >
//             <Disclosure.Panel className="mt-6 text-14 text-foundation-black-300 transition-all">
//               {typeof content === "string"
//                 ? content
//                 : content.map((item, index) => <p key={index}>{item}</p>)}
//             </Disclosure.Panel>
//           </Transition>
//         </>
//       )}
//     </Disclosure>
//   );
// }
