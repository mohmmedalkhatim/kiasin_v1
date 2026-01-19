import { DatabaseType } from "../../../context/para/database"

function Record({ DB }: { DB: DatabaseType }) {
    return (
        <div className="flex  flex-col">
            {DB.data.map((item) => (
                <div className="flex">
                    {DB.info.map(val => val.name).map(name => (<div className="m_border pl-4 cell">{item[name] }</div>))}
                </div>
            ))}
        </div>
    )
}
export default Record