use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Area {
    pub id: Option<i32>,
    pub name: Option<String>,
    pub description: Option<String>,
    pub structures: Option<Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Payload {
    pub command: String,
    pub item: Option<Area>,
    pub id: Option<i32>,
}
