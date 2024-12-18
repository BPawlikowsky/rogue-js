import process from "node:process";
import blessed from "neo-blessed";

const COLS = 100;
const ROWS = 100;

const makeNcurses = () => {
  /** @type {string[]} */
  const screenBuffer = [];
  screenBuffer.length = ROWS * COLS;
  screenBuffer.fill(" ");

  const cursorPos = { x: 0, y: 0 };

  const program = blessed.program();

  const screen = blessed.screen({
    smartCSR: true,
    program: program,
  });

  screen.title = "Rogue";

  const displayBox = blessed.box({
    cols: COLS,
    rows: ROWS,
    // style: {
    // fg: "white",
    // bg: "magenta",
    // border: {
    //   fg: "#f0f0f0",
    // },
    // },
  });

  screen.append(displayBox);

  displayBox.focus();

  const exitProgram = () => {
    program.clear();
    program.disableMouse();
    program.showCursor();
    program.normalBuffer();
    process.exit();
  };

  /**
   * @param {number} x
   * @param {number} y
   */
  const move = (x, y) => {
    cursorPos.x = x;
    cursorPos.y = y;
    program.move(x, y);
  };

  /**
   * @param {object} coordinates
   * @param {number} coordinates.x
   * @param {number} coordinates.y
   */
  const getBufPos = ({ x, y }) => y * program.cols + x;

  /** @param {string} msg */
  const write = (msg) => {
    for (let i = 0; i < msg.length; i++) {
      const letter = msg.charAt(i);
      screenBuffer[getBufPos(cursorPos)] = `${letter}`;
      if (i < msg.length - 1) cursorPos.x++;
    }
  };

  /**
   * @type {[string, () => void][]}
   */
  const keypresses = [["q", exitProgram]];
  const keyFn = (keypresses) => (ch, keyStr) => {
    keypresses.forEach((args) => {
      const [k, fn] = args;
      if (keyStr.name === k) {
        fn();
      }
    });
  };

  program.on("keypress", keyFn(keypresses));
  program.on("resize", () => {
    displayBox.setContent(screenBuffer.join(""));
    program.move(cursorPos.x, cursorPos.y);
    screen.render();
  });

  const initscr = () => {
    program.alternateBuffer();
    program.showCursor();
    program.cursorShape("block", true);
    clear();
  };

  const clear = () => {
    program.clear();
  };

  /** @param {string} msg */
  const printw = (msg) => {
    write(msg);
    displayBox.setContent(screenBuffer.join(""));
    screen.render();
  };
  /**
   * @param {number} x
   * @param {number} y
   * @param {string} msg */
  const mvprintw = (x, y, msg) => {
    move(x, y);
    write(msg);
    displayBox.setContent(screenBuffer.join(""));
    screen.render();
  };

  const key = (key, fn) => {
    keypresses.push([key, fn]);
  };

  const mvinch = (x, y) => {
    return screenBuffer[getBufPos({ x, y })];
  };

  return {
    printw,
    mvprintw,
    initscr,
    clear,
    key,
    move,
    mvinch,
  };
};

export const ncurses = makeNcurses();
