import { FaHome } from "react-icons/fa"
import { IconButton } from "./IconButton"
import { useRouter } from "next/navigation"

export const PostDetail = () => {
  const router = useRouter()
  return <>
    <div className="w-full flex flex-col items-center">
      <IconButton onClick={() => router.push('/')}>
        <FaHome className="w-6 h-6"/>
      </IconButton>
    </div>
  </>
}