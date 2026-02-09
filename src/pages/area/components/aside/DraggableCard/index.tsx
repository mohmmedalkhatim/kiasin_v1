import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import {  IconGridDots } from "@tabler/icons-react";

function DraggableCard({ id }: { id: number }) {
    let {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="p-3 border rounded border-border-main flex gap-2 items-center text-sm"
            ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <IconGridDots size={"1rem"}/>    hello {id}
        </div>
    )
}
export default DraggableCard