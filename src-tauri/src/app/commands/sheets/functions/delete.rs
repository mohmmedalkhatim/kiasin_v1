use migration::schema::sheet::Entity;
use sea_orm::{DatabaseConnection, EntityTrait};



pub  async fn delete_sheet(id:i32, db:&DatabaseConnection) -> Result<(), String> {
    let _ = Entity::delete_by_id(id)
        .exec(db)
        .await.map_err(|e| format!("Error deleting sheet: {}", e))?;
    Ok(())
}