use migration::schema::area::Entity;
use sea_orm::{DatabaseConnection, EntityTrait};

pub async fn delete_area(id: i32, db: &DatabaseConnection)->Result<(),String> {
    Entity::delete_by_id(id).exec(db).await.map_err(|e|{e.to_string()})?;
    Ok(())
}
