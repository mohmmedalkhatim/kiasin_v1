use sea_orm::entity::prelude::*;
use sea_orm_migration::sea_orm::{self, JsonValue};
use serde::{Deserialize, Serialize};

#[sea_orm::model]
#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "area")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub name: Option<String>,
    pub description: Option<String>,
    pub structure: Option<JsonValue>,
    pub created: Date,
    pub updated: Option<Date>,
    pub extra_values: Option<JsonValue>,
}

impl ActiveModelBehavior for ActiveModel {}
