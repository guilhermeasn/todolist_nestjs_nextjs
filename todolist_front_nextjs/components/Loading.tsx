export type LoadingProps = {
  children?: React.ReactNode;
}

export default function Loading({ children } : LoadingProps) {

  return (
    <div className="flex items-center justify-center p-10">
      <div className={`w-8 h-8 border-4 border-gray-500 border-t-transparent rounded-full animate-spin`}></div>
      <div className="ms-2 text-gray-500">{ children }</div>
    </div>
  )

}