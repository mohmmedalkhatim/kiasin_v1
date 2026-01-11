use serde::{Deserialize, Serialize};
use serde_json::Value;




#[derive(Debug,Clone,Serialize,Deserialize)]
pub struct Area{
    id:String,
    name:String,
    structures:Value,

}

#[derive(Debug,Clone,Serialize,Deserialize)]
pub struct Payload{
    pub command:String,
    pub item:Option<Area>,
}