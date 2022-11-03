import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AnimationItem, AnimationSegment } from 'lottie-web'
import { AnimationOptions } from 'ngx-lottie'
import { jsonFile } from '../typings'

@Component({
  selector: 'app-digital-screen',
  templateUrl: './digital-screen.component.html',
  styleUrls: ['./digital-screen.component.scss'],
})
export class DigitalScreenComponent implements OnInit {
  setInterval: any
  question: boolean = false
  startLo: boolean = false
  counter: number = -1
  numSound: number = -1
  music: boolean = false
  index: any
  rightBox: any
  falseBox: any
  count: number = 0
  questionsNumber: number = -1
  questionNumber: number = 0
  bgAudio = new Audio()
  clickBtn = new Audio()
  wrongAnswer = new Audio()
  rightAnswer = new Audio()
  sound = new Audio()
  screenClick: number = 0
  sec: any
  numOfAttempts: number = 0
  btCheck: any
  btAnswer: any
  btNext: any
  content: any
  checkBtn: number = 0
  character: boolean = true
  inputs: any

  itemJson: jsonFile[] = [
    {
      items: [
        {
          active: true,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          id: 1,
          parag:
            '<span class=text>يوجد</span> <span class="number">86</span> شخصا بالملعب من بينهم <span class="number">2</span> مدرب يريدون تنظيم فريق من <span class="number">11</span> شخص ما الأشخاص المتبقية ',
          parag2: '=',
          parag3: '+ 2 -',
          parag4: '',

          content: [
            {
              input: {
                valid: ['1'],
              },
            },
            {
              input: {
                valid: ['2'],
              },
            },
            {
              input: {
                valid: ['3'],
              },
            },
          ],
        },
        {
          active: false,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          id: 2,
          parag: 'hellossss world',
          parag2: '',
          parag3: '',
          parag4: '',
          content: [
            {
              input: {
                valid: ['4'],
              },
            },
            {
              input: {
                valid: ['5'],
              },
            },
            {
              input: {
                valid: ['6'],
              },
            },
          ],
        },
        {
          active: false,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          id: 3,
          parag: 'hellossss world',
          parag2: '',
          parag3: '',
          parag4: '',
          content: [
            {
              input: {
                valid: ['5'],
              },
            },
            {
              input: {
                valid: ['6'],
              },
            },
            {
              input: {
                valid: ['6'],
              },
            },
          ],
        },
        {
          active: false,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          id: 4,
          parag:
            '<span class=text>يوجد</span> <span class="number">86</span> شخصا بالملعب من بينهم <span class="number">2</span> مدرب يريدون تنظيم فريق من <span class="number">11</span> شخص ما الأشخاص المتبقية ',
          parag2: '=',
          parag3: '+ 2 -',
          parag4: '',

          content: [
            {
              input: {
                valid: ['11', '12'],
              },
            },
            {
              input: {
                valid: ['11'],
              },
            },
            {
              input: {
                valid: ['86'],
              },
            },
          ],
        },
        {
          active: false,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          id: 5,
          parag: 'hellossss world',
          parag2: '',
          parag3: '',
          parag4: '',
          content: [
            {
              input: {
                valid: ['3'],
              },
            },
            {
              input: {
                valid: ['4'],
              },
            },
            {
              input: {
                valid: ['4'],
              },
            },
          ],
        },
        {
          active: false,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          id: 6,
          parag: 'hellossss world',
          parag2: '',
          parag3: '',
          parag4: '',
          content: [
            {
              input: {
                valid: ['5'],
              },
            },
            {
              input: {
                valid: ['6'],
              },
            },
            {
              input: {
                valid: ['6'],
              },
            },
          ],
        },
      ],
    },
  ]

  constructor(private router: Router) {}
  options: AnimationOptions = {
    path: '/assets/Penguin.json',
    autoplay: true,
    loop: true,
    initialSegment: [0, 50],
  }
  ngOnInit(): void {
    this.nextQuestion()
    this.wrongAnswer.src = '/assets/audios/WrongAnswer.mp3'
    this.rightAnswer.src = '/assets/audios/RightAnswer.mp3'
    this.numberInput()
    // this.muteMusic();
  }
  animation: any
  animationSegment: AnimationSegment[] = [
    [0, 50],
    [120, 195],
    [250, 350],
  ]

  onAnimate(animationItem: AnimationItem): void {
    this.animation = animationItem
    console.log(animationItem)
  }

  muteMusic() {
    this.music = !this.music
    this.bgAudio.loop = true
    this.bgAudio.paused ? this.bgAudio.play() : this.bgAudio.pause()
  }

  maxLength(event: any, element: any) {
    this.index = event.target.getAttribute('index')
    console.log(this.index)
    let max = 0
    let maxLength
    this.checkBtn = 0
    this.inputs = document.querySelectorAll('.active input')

    element.content[this.index - 1].input.valid.forEach((el: any) => {
      maxLength = max > el.length ? max : el.length
    })
    event.target.setAttribute('maxlength', maxLength)
    console.log(maxLength)

    this.inputs.forEach((el: any) => {
      console.log(el)
      el.value == '' ? this.checkBtn++ : false
      console.log("checkBtn = " + this.checkBtn)

    })
    if (this.checkBtn == 0) {
      this.btCheck[0]?.classList.add('enable')
      console.log('checkBtn = ' + this.checkBtn)
    }
    else{
      this.btCheck[0]?.classList.remove('enable')

    }
  }

  foucs(event: any) {
    this.clickBtn.src = '../../assets/audios/click_btn.mp3'
    this.clickBtn.play()
    this.animation.playSegments([0, 50])
    event.target.classList.remove('false')
    document.querySelectorAll('.false').forEach((el) => {
      el.classList.remove('false')
    })
  }

  checkvalue(event: any, element: any) {
    for (const el of element.content[this.index - 1].input.valid) {
      if (el === event.target.value) {
        console.log(el)
        console.log(event.target.value)

        event.target.classList.add('right')
        event.target.classList.remove('wrong')
        break
      } else {
        event.target.classList.remove('right')
        event.target.classList.add('wrong')
      }
    }
    // const trueValue = element.content[this.index - 1].input.valid[0]
    // console.log(event.target.value)
    // console.log(trueValue)
    // let maxLength = trueValue.length
    // // console.log(event.target.value)
    // if (event.target.value == null) {
    //   event.target.classList.add('wrong')
    //   event.target.classList.remove('right')
    //   console.log('the value null')
    // } else if (event.target.value.length == maxLength) {
    //   if (event.target.value != trueValue) {
    //     event.target.classList.remove('right')
    //     event.target.classList.add('wrong')
    //     console.log('the value wrong')
    //   } else {
    //     event.target.classList.add('right')
    //     event.target.classList.remove('wrong')
    //     console.log('the value ture')
    //   }
    // }
  }

  nextQuestion() {
    this.counter += 1
    this.checkBtn = 0
    this.question = false
    this.btCheck = document.getElementsByClassName('button-check')
    this.btAnswer = document.getElementsByClassName('button-answer')
    this.btNext = document.getElementsByClassName('button-next')
    this.questionsNumber = this.itemJson[0].items.length
    this.btCheck[0]?.classList.remove('button-display')
    this.btCheck[0]?.classList.remove('enable')
    this.btAnswer[0]?.classList.remove('answer-display')
    this.btNext[0]?.classList.remove('next-display')
    console.log(this.questionsNumber)
    console.log(this.itemJson[0])
    if (this.counter > 0) {
      setTimeout(() => {
        this.sound.src = '/assets/audios/Q/Q' + this.counter + '.mp3'
        this.sound.play()
      }, 1500)
      this.soundPlay()
    }
    if (this.questionsNumber != this.counter) {
      this.itemJson[0].items.forEach((element) => {
        element.active = false
      })
      this.itemJson[0].items[this.counter].active = true
      this.numOfAttempts = 0
    }
  }
  home() {
    location.reload()
  }
  start() {
    this.bgAudio.src = '/assets/audios/music.mp3'
    this.muteMusic()
    this.startLo = true
    setTimeout(() => {
      this.sound.src = '/assets/audios/Q/Q0.mp3'
      this.sound.play()
    }, 1000)
    this.soundPlay()
  }
  soundPlay() {
    this.sound.src = '/assets/audios/Q/Q' + this.counter + '.mp3'
    this.sound.addEventListener('loadedmetadata', (event) => {
      this.sec = this.sound.duration + 10
      // console.log(this.sec)
    })

    this.setInterval = setInterval(() => {
      // console.log(this.sec)
      // console.log(this.screenClick)

      this.screenClick += 1

      if (this.screenClick == Math.floor(this.sec)) {
        setTimeout(() => {
          this.sound.play()
          this.screenClick = 0
        }, 1500)
      }
    }, 1000)
  }
  setclick() {
    this.sound.pause()
    clearInterval(this.setInterval)
    this.screenClick = 0
    this.soundPlay()
  }
  numberInput() {
    this.itemJson[0].items.forEach((el) => {
      console.log(el.content.length)
      el.numberOfquestion = el.content.length
    })
  }

  checkanswer() {
    this.itemJson[0].items.forEach((el) => {
      if (el.active) {
        this.numOfAttempts++
        el.numOfAttempts = this.numOfAttempts
        console.log(this.numOfAttempts)
        this.content = el.content
      }
    })
    this.clickBtn.src = '/assets/audios/click_btn.mp3'
    this.clickBtn.play()
    this.count = 0
    this.rightBox = document.querySelectorAll('.active .right')
    console.log(this.itemJson)
    this.itemJson[0].items.forEach((el) => {
      if (el.active) {
        el.correctCounter = document.querySelectorAll('.active .right').length
      }
    })
    this.rightBox.forEach((elem: any) => {
      elem.classList.remove('false')
      elem.classList.add('true')
      this.count += 1
    })
    this.falseBox = document.querySelectorAll('.active .wrong')

    this.falseBox.forEach((elem: any) => {
      elem.classList.remove('true')
      elem.classList.add('false')
    })
    if (this.numOfAttempts == 1) {
      if (this.falseBox.length === 0) {
        this.character = true
        this.animation.playSegments([120, 195])
      } else {
        this.character = false
        this.animation.playSegments([250, 350])
      }
      this.itemJson[0].items.filter((el) =>
        el.active
          ? el.content.length === this.count
            ? (this.rightAnswer.play(),
              setTimeout(() => {
                this.question = true

                // stop sound
                clearInterval(this.setInterval)
                this.screenClick = 0
                this.animation.playSegments([0, 50])
              }, 5000))
            : this.wrongAnswer.play()
          : false,
      )
    }
    if (this.numOfAttempts == 2 || this.numOfAttempts == 3) {
      if (this.falseBox.length === 0) {
        this.character = true
        this.animation.playSegments([120, 195])
        this.rightAnswer.play()
        setTimeout(() => {
          this.question = true
          clearInterval(this.setInterval)
          this.screenClick = 0
          this.animation.playSegments([0, 50])
        }, 5000)
      } else {
        this.character = false
        this.animation.playSegments([250, 350])
        this.wrongAnswer.play()
        if (this.numOfAttempts == 3) {
          // btNext
          this.btAnswer[0]?.classList.add('answer-display')
        }
      }
      if (this.numOfAttempts == 3) {
        this.btCheck[0]?.classList.add('button-display')
      }
    }
  }
  answer() {
    this.sound.pause()
    clearInterval(this.setInterval)
    this.screenClick = 0
    this.animation.playSegments([0, 50])
    document.querySelectorAll('.active .false').forEach((elem: any) => {
      let index = elem.getAttribute('index') - 1
      elem.value = this.content[index].input.valid[0]
    })
    this.btNext[0]?.classList.add('next-display')
  }
  next() {
    this.character = false
    this.question = true
  }
}
