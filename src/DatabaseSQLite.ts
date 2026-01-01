import Database from 'better-sqlite3';

export class DatabaseSQLite {

    db: Database.Database

    constructor() {
        this.db = new Database('game.db');

        this.db.exec(`
  CREATE TABLE IF NOT EXISTS savefile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gamestate TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);
    }

    load(): number[][] {
        const insert = this.db.prepare('SELECT gamestate from savefile');

        const dimensionJSON: any = insert.get();

        if (dimensionJSON) {
            const dimension = JSON.parse(dimensionJSON.gamestate);
            return dimension
        }

        return null

    }

    reset() {
        const reset = this.db.prepare('DELETE FROM savefile')
        reset.run()
    }


    save(dimensions: number[][]) {

        const isAlreadySaved = this.load();

        const dimensionJSON = JSON.stringify(dimensions)

        if (isAlreadySaved) {
            const update = this.db.prepare('UPDATE savefile set gamestate = @state')
            update.run({ state: dimensionJSON })
        } else {
            const insert = this.db.prepare('INSERT INTO savefile (gamestate) VALUES (@state)');
            insert.run({ state: dimensionJSON });
        }









    }


}