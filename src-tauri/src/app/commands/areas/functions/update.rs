use migration::schema::area::{ActiveModel, Entity};
use sea_orm::{prelude::*, ActiveValue::Set};

use crate::app::commands::areas::objects::Area;

pub async fn update_area(area: &Area, db: &DatabaseConnection) -> Result<(), String> {
    let model = ActiveModel {
        id: Set(area.id.clone().unwrap()),
        name: Set(area.name.clone()),
        description: Set(area.description.clone()),
        structure: Set(area.structure.clone()),
        ..Default::default()
    };
    Entity::update(model)
        .exec(db)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}
