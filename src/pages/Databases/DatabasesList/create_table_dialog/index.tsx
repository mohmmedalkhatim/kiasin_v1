import { Dialog } from "../../../../components/Dialog"
import { Input } from "../../../../components/input"
import { Select, SelectItem } from "../../../../components/select"

function CreateTableDialog({open,setOpen}:{open:boolean,setOpen:any}) {
  return (
         <Dialog
                open={open}
                onClose={() => setOpen(false)}
                title="Create a new table"
                panelClassName="max-w-[45rem] min-h-[40rem]"

            >
                <div className="flex flex-col gap-8 ">
                    <div className="px-16 ">
                        <div className="px-4 bg-dark-700/7 py-5">
                            <Input label="name" required />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="px-16">
                            <div className=" border-t z-40 bg w-full translate-y-px border-x border-border-main px-5 py-4">
                                Filed
                            </div>

                        </div>
                        <div className="border-t z-30 px-16 py-8  border-border-main">
                            <Select placeholder="create a field">
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                            </Select>
                        </div>
                    </div>
                </div>
            </Dialog>
  )
}
export default CreateTableDialog