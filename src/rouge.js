import { ncurses } from "./ncurses.js";
// import ncurses_import from "./ncurses-import.js";
// import Module from "../ncurses.js";

globalThis.Module = {
  ioctl_tcgets: () => {
    console.warn("ioctl_tcgets stub called");
    return 0; // Return a default value
  },
};
const { initscr, mvprintw, printw, move, key, mvinch } = ncurses;

// const { initscr_wa, mvprintw_wa: mvprintw } = ncurses_import;

// try {
//   ncurses_import.initscr_wa();
// } catch (e) {
//   console.log(e);
// }

function Player() {
  this.xPosition;
  this.yPosition;
  this.health;
}

const screenSetup = () => {
  initscr();
  mvprintw(10, 10, "Hello world");
  // while (true) {}
  console.log("setup");
};

const mapSetup = () => {
  mvprintw(13, 13, "--------");
  mvprintw(13, 14, "|......|");
  mvprintw(13, 15, "|......|");
  mvprintw(13, 16, "|......|");
  mvprintw(13, 17, "|......|");
  mvprintw(13, 18, "--------");

  mvprintw(40, 3, "--------");
  mvprintw(40, 4, "|......|");
  mvprintw(40, 5, "|......|");
  mvprintw(40, 6, "|......|");
  mvprintw(40, 7, "|......|");
  mvprintw(40, 8, "--------");

  mvprintw(40, 10, "------------");
  mvprintw(40, 11, "|..........|");
  mvprintw(40, 12, "|..........|");
  mvprintw(40, 13, "|..........|");
  mvprintw(40, 14, "|..........|");
  mvprintw(40, 15, "------------");
};

const playerSetup = () => {
  const newPlayer = new Player();
  newPlayer.xPosition = 14;
  newPlayer.yPosition = 14;
  newPlayer.health = 20;

  mvprintw(newPlayer.xPosition, newPlayer.yPosition, "@");
  // move(newPlayer.xPosition, newPlayer.yPosition);
  return newPlayer;
};

screenSetup();
mapSetup();
const user = playerSetup();
const playerMovement = [
  ["w", () => checkPosition(user.xPosition, user.yPosition - 1, user)],
  ["W", () => checkPosition(user.xPosition, user.yPosition - 1, user)],
  ["s", () => checkPosition(user.xPosition, user.yPosition + 1, user)],
  ["S", () => checkPosition(user.xPosition, user.yPosition + 1, user)],
  ["a", () => checkPosition(user.xPosition - 1, user.yPosition, user)],
  ["A", () => checkPosition(user.xPosition - 1, user.yPosition, user)],
  ["d", () => checkPosition(user.xPosition + 1, user.yPosition, user)],
  ["D", () => checkPosition(user.xPosition + 1, user.yPosition, user)],
];

const playerMove = (x, y, user) => {
  mvprintw(user.xPosition, user.yPosition, ".");
  user.xPosition = x;
  user.yPosition = y;
  mvprintw(x, y, "@");
};

const checkPosition = (x, y, user) => {
  const c = mvinch(x, y);
  switch (c) {
    case ".":
      {
        playerMove(x, y, user);
      }
      break;
    default: {
      // move(user.xPosition, user.yPosition);
    }
  }
};

playerMovement.forEach(([userInput, callback]) => key(userInput, callback));
