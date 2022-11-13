
export interface jsonFile {
  counterCorrect: number,
  LODegree: null,
  UserDegree: null,
  type: string,
  BloomTargets: any,
  randomNumber: null,
  loTargets: null,
  numberOfquestion: number,
  items: value[]
}
export interface value {
  type:number
  active:boolean,
  numberOfquestion: number,
  correctCounter:number,
  numOfAttempts:number,
  id: number,
  image:string,
  parag: any,
  parag2: string,
  parag3: string,
  parag4: string,
  content: Content[]
}

export interface Content {
  numOfInput:number;
  input: valid;
}
export interface valid {
  valid: string[]
}



