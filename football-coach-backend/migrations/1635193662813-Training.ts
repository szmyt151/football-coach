import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Training1635193662813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'trainings',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'Date',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'number',
            isNullable: false,
          },
          {
            name: 'trainingType',
            enum: ['Cardio', 'Tactics', 'Before match', 'Gym'],
            enumName: 'trainingType',
            default: '"Cardio"',
            type: 'varchar',
          },
          {
            name: 'team',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'player',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      false,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    // queryRunner.query(`DROP TABLE users`);
  }
}
