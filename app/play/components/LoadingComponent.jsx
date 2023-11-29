import React from 'react'
import Image from 'next/image';

export default function LoadingComponent() {
  return (
    <span className="loadScreen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            width={64}
            height={64}
             className='animate-spin duration-1000'
            src="/loading.svg"
            alt="Follow us on Twitter"
          />
        </div>
      </span>
  )
}
