import { ncurses } from "./ncurses.js";

const { initscr, mvprintw, printw, move, key, mvinch } = ncurses;

type Room = {
  xPosition: number,
  yPosition: number,
  width: number,
  height: number,
  // monsters: Monsters,
  // items: Item
}

type Player = {
  xPosition: number,
  yPosition: number,
  health: number
}


const screenSetup = () => {
  initscr();
  mvprintw(10, 10, "Hello world");
};

const createRoom = (x: number, y: number, w: number, h: number): Room => {
  const room: Room = {
    xPosition: x,
    yPosition: y,
    width: w,
    height: h
  }
  return room
}
const drawRoom = (room: Room): void => {
  for (let x = room.xPosition; x < room.xPosition + room.width; x++) {
    mvprintw(room.yPosition, x, "-")
    mvprintw(room.yPosition + room.height, x, "-")
    for (let y = room.yPosition; x < room.yPosition + room.height; y++) {
      mvprintw(room.xPosition, y, "|")
      mvprintw(room.xPosition + room.width, y, "|")
      mvprintw(x, y, ".")
    }
  }
}

const mapSetup = (): Room[] => {
  const rooms: Room[] = []
  // mvprintw(13, 13, "--------");
  // mvprintw(13, 14, "|......|");
  // mvprintw(13, 15, "|......|");
  // mvprintw(13, 16, "|......|");
  // mvprintw(13, 17, "|......|");
  // mvprintw(13, 18, "--------");

  rooms[0] = createRoom(13, 13, 6, 8)
  drawRoom(rooms[0])

  // mvprintw(40, 3, "--------");
  // mvprintw(40, 4, "|......|");
  // mvprintw(40, 5, "|......|");
  // mvprintw(40, 6, "|......|");
  // mvprintw(40, 7, "|......|");
  // mvprintw(40, 8, "--------");
  rooms[1] = createRoom(40, 3, 6, 8)
  drawRoom(rooms[1])


  // mvprintw(40, 10, "------------");
  // mvprintw(40, 11, "|..........|");
  // mvprintw(40, 12, "|..........|");
  // mvprintw(40, 13, "|..........|");
  // mvprintw(40, 14, "|..........|");
  // mvprintw(40, 15, "------------");
  rooms[2] = createRoom(40, 10, 6, 8)
  drawRoom(rooms[2])

  return rooms
};

const playerSetup = () => {
  const newPlayer: Player = {
    xPosition: 14,
    yPosition: 14,
    health: 20,
  };

  mvprintw(newPlayer.xPosition, newPlayer.yPosition, "@");
  return newPlayer;
};

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

const playerMove = (x: number, y: number, user: Player) => {
  mvprintw(user.xPosition, user.yPosition, ".");
  user.xPosition = x;
  user.yPosition = y;
  mvprintw(x, y, "@");
};

const checkPosition = (x: number, y: number, user: Player) => {
  const c = mvinch(x, y);
  switch (c) {
    case ".":
      {
        playerMove(x, y, user);
      }
      break;
    default: {
      // other tiles
    }
  }
};

playerMovement.forEach(([userInput, callback]) => key(userInput, callback));

const main = () => {
  screenSetup();
  mapSetup();
}
main()