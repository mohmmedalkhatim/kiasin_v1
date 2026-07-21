pub mod functions;
pub mod objects;
use functions::retrieve_area;
use migration::schema::area::Model;
use objects::Payload;
use std::sync::Arc;
use tauri::{ipc::Channel, State};
use tokio::sync::Mutex;

use crate::app::structures::DbConnection;

#[tauri::command]
pub async fn areas_control(
    payload: Payload,
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
                let _ = channel.send(vec![v]);
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
                let _ = channel.send(Vec::new());
                Ok(())
            }
            None => Err("you didn't add a payload item".to_string()),
        },
        "list" => {
            let list = functions::list(&db).await?;
            let _ = channel.send(list);
            Ok(())
        },
        "find_by_ids" => {
            match payload.ids{
                Some(list)=>{
                    let mut res: Vec<Model> = Vec::new();
                    for item in list{
                        let v = retrieve_area(item.clone(), &db).await?;
                        res.push(v);
                    }
                    let _ = channel.send(res);
                    Ok(())
                },
                None=>{
                    Err("you have to add an ids list".to_string())
                }
            }
        }
        _ => Err("Invalid payload command".to_string()),
    }
}
