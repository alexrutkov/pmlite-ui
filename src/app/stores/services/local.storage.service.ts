import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {

  constructor() { }

  save(id: string, data: T) {
    localStorage.setItem(id, JSON.stringify(data))
  }

  getById(id: string): T | null {
    const data = localStorage.getItem(id);
    return data ? JSON.parse(data) as T : null;
  }

  deleteById(id: string) {
    localStorage.removeItem(id);
  }
}
