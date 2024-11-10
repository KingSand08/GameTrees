// models/Store.ts

import { Game } from './Game';

export class Store {
  private _id: string;
  private _managerId: number;
  private _address: string;
  private _games: Game[];

  constructor(id: string, managerID: number, address: string, games: Game[]) {
    this._id = id;
    this._managerId = managerID;
    this._address = address;
    this._games = games;
  }

  // Accessor for id
  get id(): string {
    return this._id;
  }

  get managerId(): number {
    return this._managerId;
  }

  set managerID(newManager: number) {
    this.managerID = newManager;
  }

  // Accessor and mutator for address
  get address(): string {
    return this._address;
  }

  set address(newAddress: string) {
    this._address = newAddress;
  }

  // Accessor for games (no setter, as we don't want to overwrite the games array)
  get games(): Game[] {
    return this._games;
  }

  // Method to add a game
  addGame(game: Game) {
    this._games.push(game);
  }

  // Method to remove a game by title
  removeGameByTitle(title: string) {
    this._games = this._games.filter(game => game.title !== title);
  }
}
