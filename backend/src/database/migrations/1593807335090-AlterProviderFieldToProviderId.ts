import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProviderFieldToProviderId1593807335090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn('appointments', new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true
            },
        ));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'FK_APPOINTMENT_PROVIDER',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL', //se usuário que prestou o serviço for deletado, provider_id ficará null
            onUpdate: 'CASCADE' //se usuário que prestou o serviço tiver id alterado, provider_id também deverá ser alterado
        }));    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'FK_APPOINTMENT_PROVIDER');
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider',
            type: 'varchar',
            isNullable: false
        }));
    }

}
