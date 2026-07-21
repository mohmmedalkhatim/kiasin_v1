use migration::schema::sheet::{ActiveModel, Entity, Model};
use sea_orm::{ActiveValue::Set, DatabaseConnection, EntityTrait};

use crate::app::commands::sheets::objects;



pub async fn update_sheet(data: objects::Sheet, db: &DatabaseConnection) -> Result<Model, String> {
    let active = ActiveModel{
        id: Set(data.id.unwrap()),
        name: Set(data.name),
        description: Set(data.description),
        file: Set(data.file),
        ..Default::default()
    };
    let model = Entity::update(active).exec(db).await.map_err(|err|{err.to_string()})?;
    Ok(model)
}