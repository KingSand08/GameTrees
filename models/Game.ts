// models/Game.ts

export class Game {
    private _title: string;
    private _genres: string[];
    private _price: number;
    private _platforms: string[];
  
    constructor(title: string, genres: string[], price: number, platforms: string[]) {
      this._title = title;
      this._genres = genres;
      this._price = price;
      this._platforms = platforms;
    }
  
    // Accessor (getter)
    get title(): string {
      return this._title;
    }
  
    // Mutator (setter)
    set title(newTitle: string) {
      if (newTitle.length === 0) throw new Error("Title cannot be empty");
      this._title = newTitle;
    }
  
    get genres(): string[] {
      return this._genres;
    }
  
    set genres(newGenres: string[]) {
      this._genres = newGenres;
    }
    
    addGenre(genre: string) {
        this._genres.push(genre);
    }

    removeGenre(genre: string) {
        this._genres = this._genres.filter((p) => p !== genre);
    }
  
    get price(): number {
      return this._price;
    }
  
    set price(newPrice: number) {
      if (newPrice < 0) throw new Error("Price cannot be negative");
      this._price = newPrice;
    }
  
    get platforms(): string[] {
      return this._platforms;
    }
  
    set platforms(newPlatforms: string[]) {
      this._platforms = newPlatforms;
    }

    addPlatform(platform: string) {
        this._platforms.push(platform);
    }

    removePlatform(platform: string) {
        this._platforms = this._platforms.filter((p) => p !== platform);
    }
    
  }
  