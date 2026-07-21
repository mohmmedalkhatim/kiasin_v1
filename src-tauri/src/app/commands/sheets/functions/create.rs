
use migration::schema::sheet::{ActiveModel, Entity};
use sea_orm::{ActiveValue::Set, DatabaseConnection, EntityTrait};

use crate::app::commands::sheets::objects::Sheet;

pub async fn create_sheet(db: &DatabaseConnection, data: Sheet) -> Result<(), String> {
    let active = ActiveModel {
        name: Set(data.name),
        description: Set(data.description),
        file: Set(data.file),
        ..Default::default()
    };
    Entity::insert(active).exec(db).await.map_err(|err| err.to_string())?;
    Ok(())
}
