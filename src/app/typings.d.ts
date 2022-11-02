
export interface jsonFile {
  items: value[]
}
export interface value {
  active:boolean,
  numberOfinput: number,
  correctAnswer:number,
  trycounter:number,
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



