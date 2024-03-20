import Image from "next/image"

function Logo() {
  return (
   <Image
   height={20}
   width={100}
   alt="logo"
   src="/logo.svg"
   />
  )
}

export default Logo