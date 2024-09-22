import { Migration } from '@mikro-orm/migrations';

export class Migration20240922151351_NodeTableCreation extends Migration {
  async up(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS node');
    this.addSql(`
      CREATE TABLE node (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
          name VARCHAR(50) NOT NULL, 
          ssh_config JSON NULL, 
          docker_config JSON NULL
      );
    `);
  }

  override async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS node');
  }
}
