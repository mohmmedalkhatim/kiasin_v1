use crate::schema::area;
use crate::schema::sheet;
use sea_orm_migration::{prelude::*, sea_orm::Schema};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        let backend = manager.get_database_backend();
        let schema = Schema::new(backend);
        let _ = manager
            .create_table(schema.create_table_from_entity(area::Entity))
            .await;
        let _ = manager
            .create_table(schema.create_table_from_entity(sheet::Entity))
            .await;
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        let _ = manager
            .drop_table(Table::drop().table(area::Entity).to_owned())
            .await;
        let _ = manager
            .drop_table(Table::drop().table(area::Entity).to_owned())
            .await;
        Ok(())
    }
}
