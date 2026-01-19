use migration::schema::area::{Entity, Model};
use sea_orm::{DatabaseConnection, EntityTrait};

pub async fn retrieve_area(id: i32, db: &DatabaseConnection) -> Result<Vec<Model>, String> {
    let res = Entity::find_by_id(id)
        .one(db)
        .await
        .map_err(|e| e.to_string())?;
    Ok(vec![res.unwrap()])
}
