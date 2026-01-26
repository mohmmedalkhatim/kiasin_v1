use chrono::Local;
use migration::schema::area::{ActiveModel, Entity, Model};
use sea_orm::{prelude::*, ActiveValue::Set};
use serde_json::json;

use super::retrieve_area;

pub async fn create_area(db: &DatabaseConnection) -> Result<Vec<Model>, String> {
    let date = Local::now().naive_local().date();
    let model = ActiveModel {
        name: Set(Some("New Area".to_string())),
        description: Set(None),
        structure: Set(Some(json!({"cards":[],"dense":false}))),
        created: Set(date),
        ..Default::default()
    };
    let id = Entity::insert(model)
        .exec(db)
        .await
        .map_err(|e| e.to_string())?
        .last_insert_id;
    let area = retrieve_area(id, db).await?;

    Ok(area)
}
