pub mod functions;
pub mod objects;
use functions::retrieve_area;
use migration::schema::area::Model;
use objects::Payload;
use std::sync::Arc;
use tauri::{ipc::Channel, AppHandle, State};
use tauri_plugin_store::StoreBuilder;
use tokio::sync::Mutex;

use crate::app::structures::DbConnection;

#[tauri::command]
pub async fn areas_control(
    payload: Payload,
    manager: AppHandle,
    db: State<'_, Arc<Mutex<DbConnection>>>,
    channel: Channel<Vec<Model>>,
) -> Result<(), String> {
    let db = db.lock().await.db.clone().unwrap();
    match payload.command.as_str() {
        "create" => {
            let area = functions::create_area(&db).await?;
            let _ = channel.send(area);
            Ok(())
        }
        "retrieve" => match payload.id {
            Some(id) => {
                let v = retrieve_area(id.clone(), &db).await?;
                let _ = channel.send(v);
                Ok(())
            }
            None => Err("you didn't add a payload item".to_string()),
        },
        "update" => match payload.item {
            Some(item) => {
                let _ = functions::update_area(&item, &db).await?;
                Ok(())
            }
            None => Err("you didn't add a payload item".to_string()),
        },
        "delete" => match payload.id {
            Some(id) => {
                let _ = functions::delete_area(id, &db).await?;
                Ok(())
            }
            None => Err("you didn't add a payload item".to_string()),
        },
        "list" => {
            let store = StoreBuilder::new(&manager, "main.json").build().map_err(|e| e.to_string())?;
            let list = store.get("list");
            if let Some(list) = list {
                let list: Vec<i32> =
                    serde_json::from_value(list.clone()).map_err(|e| e.to_string())?;
                let mut areas: Vec<Model> = vec![];
                for id in list {
                    let mut area = retrieve_area(id, &db).await?;
                    areas.append(&mut area);
                }
                let _ = channel.send(areas);
            }
            Ok(())
        }
        _ => Err("Invalid payload.item.unwrap().id command".to_string()),
    }
}
