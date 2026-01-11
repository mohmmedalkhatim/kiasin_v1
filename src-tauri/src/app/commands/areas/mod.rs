use tauri::Runtime;
pub mod objects;
use objects::Payload;


#[tauri::command]
pub async fn area_control<R: Runtime>(payload:Payload) -> Result<(), String> {
  Ok(())
}