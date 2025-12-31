const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

export default class Control {

    rl: any


    async waitForInput() {

        this.rl = readline.createInterface({ input, output });

        return new Promise((resolve, reject) => {


            this.rl.question('What do you think of Node.js? ', (answer) => {

                this.rl.close();
                resolve(answer)


            });

        })
    }

}



