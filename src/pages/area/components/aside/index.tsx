import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../contexts/store"
import { closestCenter, DndContext, DragEndEvent, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DraggableCard from "./DraggableCard"
import { useState } from "react"
import Button from "../../../../components/Button"
import { create_card } from "../../../../contexts/area/functions/card/create"
import { areas, Card } from "../../../../contexts/area"
import { useAsync } from "react-use"
import { update } from "../../../../contexts/area/functions/update"



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
          const oldIndex = items.indexOf(items.find(item => item.id == Number(active.id)) as Card);
          const newIndex = items.indexOf(items.find(item => item.id == Number(over.id)) as Card);
          console.log(arrayMove(items, oldIndex, newIndex))
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  }

  return (
    <aside className="fixed p-3 pb-5 top-0 flex flex-col justify-between right-0 mt-28 h-[calc(100vh-7rem)] w-72 z-30 border-border-main border-l bg">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext
          items={structure.cards}
          strategy={verticalListSortingStrategy}
        >
          <div className="gap-2 flex flex-col">
            {items.map((item) => <DraggableCard id={item.id} />)}
          </div>
          <DragOverlay />
        </SortableContext>
      </DndContext>
      <Button onClick={() => dispatch(create_card({ type: "form" }))}>create</Button>
    </aside>
  )
}
export default Aside