import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToAppointments1595513414860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true
            },
        ));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'FK_APPOINTMENT_USER',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL', 
            onUpdate: 'CASCADE' 
        }));    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'FK_APPOINTMENT_USER');
        await queryRunner.dropColumn('appointments', 'user_id');
    }

}
