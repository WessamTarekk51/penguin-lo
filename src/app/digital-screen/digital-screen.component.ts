import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AnimationItem, AnimationSegment } from 'lottie-web'
import { AnimationOptions } from 'ngx-lottie'
import { jsonFile, value } from '../typings'

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
  helpHand: boolean = true
  checkHand: boolean = false
  answerHand: boolean = false
  nextHand: boolean = false
  try: any
  border: any
  containerClass: any
  shuffled: value[] = []
  click: boolean = false
  result: number = 0
  loQuestion: number = 2
  finish: any
  Estimation: any
  answers: string[] = []
  l:number=0;

  itemJson: jsonFile[] = [
    {
      counterCorrect: 0,
      LODegree: null,
      UserDegree: null,
      type: '',
      BloomTargets: null,
      randomNumber: null,
      loTargets: null,
      numberOfquestion: 0,
      items: [
        {
          type: 2,
          id: 1,
          active: false,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          image: '/assets/question/1.png',
          parag: ['قرب العدد 45.29 لأقرب جزء من عشرة.'],
          parag2: '45.3',
          parag3: '45.2',
          parag4: '45.29 ≈ ',
          content: [
            {
              input: {
                valid: ['111', '11', '1'],
                nums: 3,
              },
            },

          ],
        },
        {
          type: 1,
          id: 1,
          active: false,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          image: '/assets/question/1.png',
          parag: ['قرب العدد 45.29 لأقرب جزء من عشرة.'],
          parag2: '45.3',
          parag3: '45.2',
          parag4: '45.29 ≈ ',
          content: [
            {
              input: {
                valid: ['111', '11', '1'],
                nums: 1,
              },

            },
            {
              input: {
                valid: ['111', '11', '1'],
                nums: 1,
              },
            },

          ],
        },
      ],
    },
  ]

  constructor(private router: Router) {

  }
  options: AnimationOptions = {
    path: '/Penguin.json',
    autoplay: true,
    loop: true,
    initialSegment: [0, 50],
  }


  progressbar: AnimationOptions = {
    path: '/assets/progressBar.json',
    autoplay: true,
    loop: false,
    initialSegment: [0, 1],
  }

  ngOnInit(): void {
    this.shuffle(this.itemJson[0].items)
    this.nextQuestion()
    this.wrongAnswer.src = '/assets/audios/WrongAnswer.mp3'
    this.rightAnswer.src = '/assets/audios/RightAnswer.mp3'
    this.numberInput()
    // this.muteMusic();
  }
  animation: any
  progress: any

  animationSegment: AnimationSegment[] = [
    [0, 50],
    [120, 195],
    [250, 350],
  ]

  onAnimate(animationItem: AnimationItem): void {
    this.animation = animationItem
  }
  progressBar(progressBar: AnimationItem): void {
    this.progress = progressBar
  }
  start() {
    this.bgAudio.src = '/assets/audios/music.mp3'
    this.muteMusic()
    this.startLo = true
    setTimeout(() => {
      this.sound.src =
        '/assets/audios/Q/Q' + this.itemJson[0].items[this.counter].id + '.mp3'
      console.log(this.sound)
      this.sound.play()
    }, 1000)
    this.soundPlay()
  }
  muteMusic() {
    this.music = !this.music
    this.bgAudio.loop = true
    this.bgAudio.paused ? this.bgAudio.play() : this.bgAudio.pause()
  }
  nextQuestion() {
    this.answers = []
    this.counter += 1
    this.checkBtn = 0
    this.question = false
    this.helpHand = true
    this.click = false
    console.log(this.sound)
    this.sound.src =
      '/assets/audios/Q/Q' + this.itemJson[0].items[this.counter].id + '.mp3'
    this.btNext = document.getElementsByClassName('next')
    this.border = document.getElementsByClassName('border')
    this.questionsNumber = this.itemJson[0].items.length

    this.btNext[0]?.classList.remove('btn-next-active')
    this.btNext[0]?.classList.add('btn-next')
    if (this.counter > 0) {
      setTimeout(() => {
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
  soundPlay() {
    this.sound.addEventListener('loadedmetadata', (event) => {
      this.sec = this.sound.duration + 10
    })
    this.setInterval = setInterval(() => {
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
    this.sound.currentTime = 0
    clearInterval(this.setInterval)
    this.screenClick = 0

    if (this.click == false) {
      this.soundPlay()
    }
  }
  maxLength(event: any, element: any) {
    if (this.answers.length == 0) {
      this.answers = element.content[0].input.valid.slice()
    }

    this.index = event.target.getAttribute('index')
    let maxLength = 0
    this.checkBtn = 0
    if (element.type == 1) {
      element.content[this.index - 1].input.valid.forEach((el: any) => {
        maxLength = maxLength > el.length ? maxLength : el.length
      })
    } else {
      // typessss
      element.content[0].input.valid.forEach((el: any) => {
        maxLength = maxLength > el.length ? maxLength : el.length
        console.log(maxLength)
      })
    }
    event.target.setAttribute('maxlength', maxLength)

    // console.log(maxLength)
    this.inputs = document.querySelectorAll('.active input')

    this.inputs.forEach((el: any) => {
      // console.log(el)
      el.value == '' ? this.checkBtn++ : false
      // console.log('checkBtn = ' + this.checkBtn)
    })
    // if (this.checkBtn == 0) {
    //   this.btCheck[0]?.classList.remove('btn-check')
    //   this.btCheck[0]?.classList.add('btn-check-active')
    //   this.checkHand = true
    //   // console.log('checkBtn = ' + this.checkBtn)
    // } else {
    //   this.btCheck[0]?.classList.remove('btn-check-active')
    //   this.btCheck[0]?.classList.add('btn-check')

    //   this.checkHand = false
    // }
  }
  foucs(event: any) {
    this.helpHand = false
    this.clickBtn.src = '../../assets/audios/click_btn.mp3'
    this.clickBtn.play()
    this.animation.playSegments([0, 50])
    event.target.classList.remove('false')

  }
  checkvalue(event: any, element: any) {
    this.l++
    if (element.type == 1) {
      for (const el of element.content[this.index - 1].input.valid) {
        if (el === event.target.value.trim()) {
          event.target.classList.add('right')
          event.target.classList.remove('wrong')
          event.target.classList.remove('emptyInput')
          break
        } else {
          event.target.classList.remove('right')
          event.target.classList.add('wrong')
          event.target.classList.add('emptyInput')
        }
      }
    } else {
      for (const el of this.answers) {
        if (el === event.target.value.trim()) {
          let idx = this.answers.indexOf(event.target.value)
          this.answers.splice(idx, 1)
          event.target.classList.add('right')
          event.target.classList.remove('wrong')
          event.target.classList.remove('emptyInput')
          break
        } else {
          event.target.classList.remove('right')
          event.target.classList.add('wrong')
          event.target.classList.add('emptyInput')
        }
      }
    }



    this.itemJson[0].items.forEach((el) => {
      if (el.active) {
        el.correctCounter = document.querySelectorAll('.active .right').length
        if (element.correctCounter == element.numberOfquestion) {
          this.character = true
          this.animation.playSegments([120, 195])
          this.rightAnswer.play()
          setTimeout(() => {
            this.click = true
            this.question = true
            clearInterval(this.setInterval)
            this.screenClick = 0
            this.animation.playSegments([0, 50])
          }, 5000)
        }
      }
    })

  }
  numberInput() {
    this.itemJson[0].items.forEach((el) => {
      // console.log(el.content.length)
      if(el.type==1){
      el.numberOfquestion = el.content.length
      }
      else{
       el.content.forEach((elem)=>{
        el.numberOfquestion =+ elem.input.nums
       })
      }
    })
  }
  checkanswer() {
    this.checkHand = false
    this.l++
    this.itemJson[0].items.forEach((el) => {
      if (el.active) {
        this.content = el.content
      }
    })
    this.clickBtn.src = '/assets/audios/click_btn.mp3'
    this.clickBtn.play()
    this.count = 0
    this.rightBox = document.querySelectorAll('.active .right')
    this.itemJson[0].items.forEach((el) => {
      if (el.active) {
        el.correctCounter = document.querySelectorAll('.active .right').length
      }
    })
    this.rightBox.forEach((elem: any) => {
      elem.classList.remove('false')
      elem.classList.remove('emptyInput')
      elem.classList.add('true')
      this.count += 1
    })
    this.falseBox = document.querySelectorAll('.active .emptyInput')

    this.falseBox.forEach((elem: any) => {
      elem.classList.remove('true')
      elem.classList.add('false')
      elem.classList.add('emptyInput')

    })

    if (this.falseBox.length === 0) {
      this.character = true
      this.animation.playSegments([120, 195])
      this.rightAnswer.play()
      setTimeout(() => {
        this.click = true
        // stop sound
        this.question = true
        clearInterval(this.setInterval)
        this.screenClick = 0
        this.animation.playSegments([0, 50])
      }, 5000)

    } else {
      this.wrongAnswer.play()
        this.character = false
        this.animation.playSegments([250, 350])
        this.wrongAnswer.play()
        this.helpHand = false
        this.answerHand = true
        // this.inputs.forEach((el: any) => {
        //   el.style.cssText = 'pointer-events: none'
        // })
      // }
    }


  }
  answer() {
    this.itemJson[0].items.filter((el) => {
      if (el.active) {
        this.content = el.content
        if (this.answers.length == 0) {
          this.answers = el.content[0].input.valid.slice();
        }
      }
    });

    this.click = true
    this.answerHand = false
    console.log(this.sound.pause())
    this.sound.pause()
    this.sound.currentTime = 0
    this.animation.playSegments([0, 50])
    document.querySelectorAll('.active .emptyInput').forEach((elem: any, i) => {
      console.log(elem)
      let type = elem.getAttribute('inputType')
      elem.classList.add('displayinput')
      elem.classList.remove('false')
      elem.classList.remove('wrong')
      let index = elem.getAttribute('index') - 1
      console.log("ddddddddd" + index)
      console.log(type)
      if (type == 1) {
        elem.value = this.content[index].input.valid[0]
      } else {
        console.log(this.answers[i])
        elem.value = this.answers[i]
        console.log("value"+ " " +"type 2" +" " + elem.value)

      }
    })
    this.btNext[0]?.classList.remove('btn-next')
    this.btNext[0]?.classList.add('btn-next-active')
    this.nextHand = true
  }
  next() {
    this.nextHand = false
    this.character = false
    this.question = true
  }
  home() {
    location.reload()
  }
  focusin(event: any) {
    this.helpHand = false
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      this.containerClass = document.getElementsByClassName('penguin')
      if (innerWidth > innerHeight) {
        console.log('innerWidth > innerHeight')
        if (event.target.offsetTop > innerHeight / 3) {
          this.border[0].style.cssText = `padding-bottom: ${innerHeight / 30}vw`
          this.border[0].scrollTop = innerHeight / 30
        }
      }
    }
  }
  focusout(event: any) {
    this.border[0].style.cssText = 'padding-bottom: 0vw ;'
  }
  shuffle(a: any[]) {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    this.shuffled = a.slice(0, this.loQuestion)
    console.log(this.shuffled)
  }
  calculate() {
    this.result = 0
    this.itemJson[0].items.forEach((el) => {
      if (el.correctCounter == el.numberOfquestion) {
        this.result += 1 / el.numOfAttempts
      }
    })
    console.log((this.result * 100) / this.loQuestion)
    this.finish = (this.result * 100) / this.loQuestion
    console.log(this.finish)
    if (this.finish >= 1 && this.finish <= 50) {
      console.log('ضعيف')
      this.Estimation = 'ضعيف'
      this.progress.playSegments([0, 20])
    }
    if (this.finish >= 51 && this.finish <= 64) {
      console.log('مقبول')
      this.Estimation = 'مقبول'
    }
    if (this.finish >= 65 && this.finish <= 84) {
      console.log('جيد ')
      this.Estimation = 'جيد'
    }
    if (this.finish >= 85 && this.finish <= 100) {
      console.log('يفوق التوقعات ')
      this.Estimation = 'يفوق التوقعات '
    }
  }
}
