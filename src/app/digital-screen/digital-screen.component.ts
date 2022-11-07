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
  helpHand: boolean = true
  checkHand: boolean = false
  answerHand: boolean = false
  nextHand: boolean = false
  try: any
  border:any
  containerClass:any

  itemJson: jsonFile[] = [
    {
      items: [
        {
          type: 1,
          active: true,
          numberOfquestion: 0,
          correctCounter: 0,
          numOfAttempts: 0,
          id: 1,
          image:"/assets/question/1.png",
          parag: [
            'قرب العدد 45.29 لأقرب جزء من عشرة.'
          ],
          parag2: '22',
          parag3: '33',
          parag4: '45.29 ≈ ',
          content: [
            {
              numOfInput: 2,
              input: {
                valid: ['1', '2'],
              },
            },
            {
              numOfInput: 1,
              input: {
                valid: ['3'],
              },
            }
          ],
        }
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
  muteMusic() {
    this.music = !this.music
    this.bgAudio.loop = true
    this.bgAudio.paused ? this.bgAudio.play() : this.bgAudio.pause()
  }
  nextQuestion() {
    this.counter += 1
    this.checkBtn = 0
    this.question = false
    this.helpHand = true
    this.btCheck = document.getElementsByClassName('check')
    this.btAnswer = document.getElementsByClassName('answer')
    this.btNext = document.getElementsByClassName('next')
    this.try = document.getElementsByClassName('try-active')
    this.border = document.getElementsByClassName('border')
    this.questionsNumber = this.itemJson[0].items.length
    this.btCheck[0]?.classList.remove('button-display')
    this.btCheck[0]?.classList.remove('enable')
    this.btAnswer[0]?.classList.remove('answer-display')
    this.btNext[0]?.classList.remove('next-display')
    this.try[0]?.classList.remove('try')
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
  maxLength(event: any, element: any) {
    this.index = event.target.getAttribute('index')
    console.log(this.index)
    let max = 0
    let maxLength
    this.checkBtn = 0

    element.content[this.index - 1].input.valid.forEach((el: any) => {
      maxLength = max > el.length ? max : el.length
    })
    event.target.setAttribute('maxlength', maxLength)
    // console.log(maxLength)
    this.inputs = document.querySelectorAll('.active input')

    this.inputs.forEach((el: any) => {
      // console.log(el)
      el.value == '' ? this.checkBtn++ : false
      console.log('checkBtn = ' + this.checkBtn)
    })
    if (this.checkBtn == 0) {
      this.btCheck[0]?.classList.remove('btn-check')
      this.btCheck[0]?.classList.add('btn-check-active')
      this.checkHand = true
      console.log('checkBtn = ' + this.checkBtn)
    } else {
      this.btCheck[0]?.classList.remove('btn-check-active')
      this.btCheck[0]?.classList.add('btn-check')

      this.checkHand = false
    }
  }
  foucs(event: any) {
    this.helpHand = false
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
          event.target.classList.add('right')
          event.target.classList.remove('wrong')
          break
        } else {
          event.target.classList.remove('right')
          event.target.classList.add('wrong')
        }
      }

  }
  numberInput() {
    this.itemJson[0].items.forEach((el) => {
      console.log(el.content.length)
      el.numberOfquestion = el.content.length
    })
  }
  checkanswer() {
    this.checkHand = false
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

      if (this.falseBox.length === 0) {
        this.numOfAttempts -= 1
        this.character = true
        this.animation.playSegments([120, 195])
        this.rightAnswer.play()
      }

      else {
        if(this.numOfAttempts == 1){
        this.character = false
        this.animation.playSegments([250, 350])
        }
        if(this.numOfAttempts == 2){
          this.character = false
          this.animation.playSegments([250, 350])
          this.wrongAnswer.play()
          this.helpHand = false
          this.answerHand = true
          this.btAnswer[0]?.classList.remove('btn-answer')
          this.btAnswer[0]?.classList.add('btn-answer-active')
          this.btCheck[0]?.classList.remove('btn-check-active')
          this.btCheck[0]?.classList.add('btn-check')
          this.try[0]?.classList.add('try')
          this.inputs.forEach((el: any) => {
           el.style.cssText="pointer-events: none"
          })
        }
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
              }, 3000))
            : this.wrongAnswer.play()
          : false,
      )
  }
  answer() {
    this.answerHand = false
    this.sound.pause()
    clearInterval(this.setInterval)
    this.screenClick = 0
    this.animation.playSegments([0, 50])
    document.querySelectorAll('.active .false').forEach((elem: any) => {
      elem.classList.remove('false')
      elem.classList.add('displayinput')
      let index = elem.getAttribute('index') - 1
      elem.value = this.content[index].input.valid[0]
    })
    this.btAnswer[0]?.classList.remove('btn-answer-active')
    this.btAnswer[0]?.classList.add('btn-answer')
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
  focusin(event: any){
    this.helpHand = false
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    this.containerClass=document.getElementsByClassName('penguin')
    console.log(this.containerClass)
   if(innerWidth > innerHeight){
    console.log("innerWidth > innerHeight")
    // console.log(event.target.parentElement.offsetTop)
    console.log(event.target.offsetTop)
     if(event.target.offsetTop > innerHeight/3){
          console.log('event.target.offsetTop < innerHeight/4')
          // this.border[0]?.classList.add('borderTab')
          this.border[0].style.cssText =`padding-bottom: ${innerHeight/30}vw`
          this.border[0].scrollTop =innerHeight / 30
     }
    }
   }

  }
  focusout(event: any){
    this.border[0].style.cssText ="padding-bottom: 0vw ;"
  }
}
