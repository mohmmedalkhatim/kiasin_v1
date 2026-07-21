use migration::schema::area::{Entity, Model};
use sea_orm::{DatabaseConnection, EntityTrait};

pub async fn retrieve_area(id: i32, db: &DatabaseConnection) -> Result<Model, String> {
    let model = Entity::find_by_id(id)
        .one(db)
        .await
        .map_err(|e| e.to_string())?;
    match model{
        Some(res)=>{
            Ok(res)
        },
        None=>{
            Err("couldn't find the area".to_string())
        }
    }
}
pub async fn list(db: &DatabaseConnection) -> Result<Vec<Model>, String> {
    let areas = Entity::find()
        .all(db)
        .await
        .map_err(|e| e.to_string())?;
    Ok(areas)
}

