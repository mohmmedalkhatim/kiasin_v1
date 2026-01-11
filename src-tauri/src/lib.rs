use app::{structures::DbConnection, util::database_connection};
use migration::{self, MigratorTrait};
use tauri::{path::BaseDirectory, Manager};
use tokio::sync::Mutex;
use std::sync::Arc;
mod app;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let database_url = app
                .handle()
                .path()
                .resolve("Database\\test.db", BaseDirectory::AppData)
                .unwrap();
            let temp_url = app
                .app_handle()
                .path()
                .resolve("temp\\index.db", BaseDirectory::AppData)
                .unwrap();
            std::fs::create_dir_all(&temp_url.parent().unwrap()).unwrap();
            std::fs::File::create(&temp_url).unwrap();
            if !database_url.exists() {
                std::fs::create_dir_all(database_url.parent().unwrap()).unwrap();
                std::fs::File::create(&database_url).unwrap();
            }
            let database = Arc::new(Mutex::new(DbConnection { db: None }));
            let shadow = database.clone();
            tauri::async_runtime::spawn(async move {
                shadow.lock().await.db =
                    Some(database_connection(database_url.display().to_string()).await);
                let _ = migration::Migrator::up(&shadow.lock().await.db.clone().unwrap(), None)
                    .await;
            });
            app.manage(database);

            Ok(())
        });
        builder.invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
