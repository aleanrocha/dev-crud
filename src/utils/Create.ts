import { v4 } from 'uuid'

export class Create {
  static Id(): string {
    return v4()
  }
}
