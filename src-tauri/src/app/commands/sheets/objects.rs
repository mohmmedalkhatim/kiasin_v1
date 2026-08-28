use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Sheet {
    pub id: Option<i32>,
    pub name: Option<String>,
    pub description: Option<String>,
    pub file: Option<String>,
    pub created: Option<String>,
    pub updated: Option<String>,
}


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Payload {
    pub command: String,
    pub data: Option<Sheet>,
    pub id: Option<i32>,
}
