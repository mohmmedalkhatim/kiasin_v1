import React, { ReactElement, ReactNode } from "react"
import "./index.css"


type MainGridProps = {
    children?: ReactNode | ReactElement | ReactElement[];
}



function MainGrid({ children }: MainGridProps) {
    return (
        <div className="main_grid_container">
            {children}
        </div>
    )
}
export default MainGrid