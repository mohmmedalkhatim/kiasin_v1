import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../contexts/store"
import { closestCenter, DndContext, DragEndEvent, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DraggableCard from "./DraggableCard"
import { useState } from "react"
import { areas, Card } from "../../../../contexts/area"
import { useAsync } from "react-use"
import { update } from "../../../../contexts/area/functions/update"
import Popover from "../Popover"


function Aside() {
  const dispatch = useDispatch<AppDispatch>()
  let structure = useSelector((state: RootState) => state.area.active.area.structure)
  let area = useSelector((state: RootState) => state.area.active.area)
  let [items, setItems] = useState<Card[]>(structure.cards)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useAsync(async () => {
    if (items && area) {
      dispatch(areas.actions.update_card_order(items))
      dispatch(update(area))
    }
  }, [items])
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over) {
      if (active.id !== over.id) {
        setItems((items) => {
          let filtered = structuredClone(arrayMove(items, Number(active.id), Number(over.id)))
          return filtered;
        });
      }
    }
  }

  return (
    <>
      <aside className="fixed p-3 pb-5 top-0 flex flex-col justify-between right-0 mt-28 h-[calc(100vh-7rem)] w-72 z-30 border-border-main border-l bg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <SortableContext
            items={structure.cards}
            strategy={verticalListSortingStrategy}
          >
            <div className="gap-2 flex flex-col overflow-x-auto gutter">
              {items.map((item, i) => <DraggableCard card={item} id={i} />)}
            </div>
            <DragOverlay />
          </SortableContext>
        </DndContext>
        <Popover />
      </aside>
    </>
  )
}
export default Aside