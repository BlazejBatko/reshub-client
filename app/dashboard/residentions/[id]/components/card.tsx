import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  children: React.ReactNode
  title?: string
  isLoading?: boolean
}

const Card = ({ children, title, isLoading }: Props) => {
  return (
    <div className="rounded-md border px-10 py-2">
      {isLoading ? (
        <Skeleton className="aspect-video"></Skeleton>
      ) : (
        <>
          {title && <h1 className="mb-5 text-lg">{title}</h1>}
          {children}
        </>
      )}
    </div>
  )
}

export default Card
