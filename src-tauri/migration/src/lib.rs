pub use sea_orm_migration::prelude::*;
mod migration_2026;
pub mod schema;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![Box::new(migration_2026::Migration)]
    }
}
