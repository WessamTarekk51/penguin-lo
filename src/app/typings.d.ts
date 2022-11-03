
export interface jsonFile {
  items: value[]
}
export interface value {
  active:boolean,
  numberOfquestion: number,
  correctCounter:number,
  numOfAttempts:number,
  id: number,
  parag: string,
  parag2: string,
  parag3: string,
  parag4: string,

  content: Content[]
}

export interface Content {
  input: valid;
}
export interface valid {
  valid: string[]
}



