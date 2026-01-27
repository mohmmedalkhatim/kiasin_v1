import { AllHTMLAttributes, ReactElement } from "react"

type Header_component = {
  children?: ReactElement | ReactElement[]
} & AllHTMLAttributes<HTMLDivElement>


function Header({ children, ...props }: Header_component) {
  return (
    <header {...props} className={"flex w-[calc(100vw-4.75rem)] bg top-10 left-19 fixed  items-center justify-between h-18 z-40 border-b border-border-main px-8 " + props.className}>
      {children}
    </header>
  )
}
export default Header