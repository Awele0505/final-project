import React from 'react'
import { Link } from "react-router-dom";

const arrow = <svg
  class="h-5 w-auto text-gray-400"
  fill="currentColor"
  viewBox="0 0 20 20"
>
 <path
   fill-rule="evenodd"
   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
   clip-rule="evenodd"
 ></path>
</svg>

const Breadcrumbs = ({ items }) => {
  return (  
    <ul class="flex text-gray-500 text-sm lg:text-base py-4">
      {items.map(({ link, name }, index) => 
        <li class="inline-flex items-center">
           <Link to={link}>{name}</Link>
           {index < items.length - 1 && arrow}
         </li>
      )}
    </ul>
  )
}

export default Breadcrumbs