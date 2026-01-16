import React from 'react';
import "./index.css";

interface CardContainerProps {
  columns: number,
  rows?: number,
};

function CardContainer({ children, columns = 1, rows = 1, ...props }: CardContainerProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"card_container " + props.className} style={{ gridColumn: `span ${columns}`, gridRow: `span ${rows}` }} >{children}</div>
  )
}
export default CardContainer