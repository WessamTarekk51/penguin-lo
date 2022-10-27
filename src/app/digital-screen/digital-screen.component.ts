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
  itemJson: jsonFile[] = [
    {
      items: [
        {
          active: true,
          id: 1,
          parag:
            '<span class=text>يوجد</span> <span class="number">86</span> شخصا بالملعب من بينهم <span class="number">2</span> مدرب يريدون تنظيم فريق من <span class="number">11</span> شخص ما الأشخاص المتبقية ',
          parag2: '=',
          parag3: '+ 2 -',
          parag4: '',

          content: [
            {
              input: {
                valid: ['73'],
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
          id: 2,
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
          ],
        },
        {
          active: false,
          id: 2,
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
    const trueValue = element.content[this.index - 1].input.valid[0]
    let maxLength = trueValue.length
    event.target.setAttribute('maxlength', maxLength)
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
    const trueValue = element.content[this.index - 1].input.valid[0]
    console.log(event.target.value)
    console.log(trueValue)
    let maxLength = trueValue.length
    // console.log(event.target.value)
    if (event.target.value == null) {
      event.target.classList.add('wrong')
      event.target.classList.remove('right')
      console.log('the value null')
    } else if (event.target.value.length == maxLength) {
      if (event.target.value != trueValue) {
        event.target.classList.remove('right')
        event.target.classList.add('wrong')
        console.log('the value wrong')
      } else {
        event.target.classList.add('right')
        event.target.classList.remove('wrong')
        console.log('the value ture')
      }
    }
  }

  checkanswer() {
    this.clickBtn.src = '/assets/audios/click_btn.mp3'
    this.clickBtn.play()
    this.count = 0
    this.rightBox = document.querySelectorAll('.active .right')
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
      this.animation.playSegments([120, 195])
    } else {
      this.animation.playSegments([250, 350])
    }
    this.itemJson[0].items.filter((el) =>
      el.active
        ? el.content.length === this.count
          ? (this.rightAnswer.play(),
            setTimeout(() => {
              this.question = true
            }, 3500))
          : this.wrongAnswer.play()
        : false,
    )
  }

  nextQuestion() {
    this.counter += 1
    console.log(this.counter)

    this.question = false
    this.questionsNumber = this.itemJson[0].items.length
    if (this.counter > 0) {
      setTimeout(() => {
        this.sound.src = '/assets/audios/Q/Q'+this.counter+'.mp3'
        this.sound.play()
      }, 1500)
      this.soundPlay()


    }

    if (this.questionsNumber != this.counter) {
      this.itemJson[0].items.forEach((element) => {
        element.active = false
      })
      this.itemJson[0].items[this.counter].active = true
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
    }, 1500)
    this.soundPlay()
  }

  soundPlay() {
    this.setInterval = setInterval(() => {
      this.screenClick += 1
      if (this.screenClick == 10) {
        setTimeout(() => {
          this.sound.src = '/assets/audios/Q/Q0.mp3'
          this.sound.play()
          this.screenClick = 0
        }, 1500)
      }
    }, 1000)
  }
  setclick() {
    clearInterval(this.setInterval)
    this.screenClick = 0
    this.soundPlay()
  }
}
