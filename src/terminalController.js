import readLine from "readline";
import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";

import Person from "./person.js";

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = [];
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOption(), data);

    console.draft(`\n*** This table is in language: ${language} ***`);
    this.print = console.draft(table);
    this.data = data;
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOption(), this.data));
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOption() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.blue("KM Traveled") },
        { field: "from", name: chalk.green("From") },
        { field: "to", name: chalk.yellow("To") },
      ],
    };
  }
}
