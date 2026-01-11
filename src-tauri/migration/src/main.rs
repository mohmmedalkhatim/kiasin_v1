use sea_orm_migration::prelude::*;
mod 
use tokio;

#[tokio::main]
async fn main() {
    cli::run_cli(migration::Migrator).await;
}
