import database from "./../database.json";
import Person from "./person.js";
import { save } from "./repository.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-BR";
// const DEFAULT_LANG = "es"; // espanhol
// const DEFAULT_LANG = "en"; // inglês
// const DEFAULT_LANG = "rus"; // russo
// const DEFAULT_LANG = "zh-Hans-CN"; // chinês simplificado
// const DEFAULT_LANG = "sr-Cyrl"; // Sérvio escrito usando o script cirílico
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("process finished!");
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    await save(person);

    return mainLoop();
  } catch (error) {
    console.error("DEU RUIM**", error);
    return mainLoop();
  }
}

await mainLoop();
