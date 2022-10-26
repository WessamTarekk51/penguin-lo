import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem, AnimationSegment } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { jsonFile } from '../typings';

@Component({
  selector: 'app-digital-screen',
  templateUrl: './digital-screen.component.html',
  styleUrls: ['./digital-screen.component.scss']
})
export class DigitalScreenComponent implements OnInit {
  question: boolean = false;
  startLo: boolean = false;

  counter: number = -1;
  music: boolean = false;
  index: any;
  rightBox: any;
  falseBox: any;
  count: number = 0;
  questionsNumber: number = -1;
  questionNumber: number = 0;

  constructor(
    private router: Router,
  ) { }

  options: AnimationOptions = {
    path: '/assets/Penguin.json',
    autoplay: true,
    loop: true,
    initialSegment: [0, 50]
  };

  ngOnInit(): void {
    this.nextQuestion();
  }

  animation: any;
  animationSegment: AnimationSegment[] = [
    [0, 50],
    [120, 195],
    [250, 350],
  ];

  onAnimate(animationItem: AnimationItem): void {
    this.animation = animationItem;
    console.log(animationItem);
  }

  muteMusic() {
    this.music = !this.music;
  }

  itemJson: jsonFile[] = [
    {
      items: [
        {
          active: true,
          id: 1,
          parag:
            "  ",
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
            }

          ],
        },
        {
          active: false,
          id: 2,
          parag: 'hellossss world',
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
            }

          ],
        },
        {
          active: false,
          id: 2,
          parag: 'hellossss world',
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
            }

          ],
        }
      ],
    },
  ];

  handClick(event: any, element: any) {
    // console.log(event.target.value)
    this.index = event.target.getAttribute('index');
    const trueValue = element.content[this.index - 1].input.valid[0];
    let maxLength = trueValue.length;
    event.target.setAttribute('maxlength', maxLength);
    event.target.classList.remove('false');
    document.querySelectorAll('.false').forEach((el) => {
      el.classList.remove('false');
    });
  }

  checkvalue(event: any, element: any) {

    const trueValue = element.content[this.index - 1].input.valid[0];
    console.log(event.target.value)
    console.log(trueValue)
    let maxLength = trueValue.length;
    // console.log(event.target.value)
    if (event.target.value == null) {
      event.target.classList.add('wrong');
      event.target.classList.remove('right');
      console.log('the value null');
    } else if (event.target.value.length == maxLength) {
      if (event.target.value != trueValue) {
        event.target.classList.remove('right');
        event.target.classList.add('wrong');
        console.log('the value wrong');
      } else {
        event.target.classList.add('right');
        event.target.classList.remove('wrong');
        console.log('the value ture');
      }
    }
  }

  checkanswer() {
    this.count = 0;
    this.rightBox = document.querySelectorAll('.active .right');
    this.rightBox.forEach((elem: any) => {
      elem.classList.remove('false');
      elem.classList.add('true');
      this.count += 1;
    });
    this.falseBox = document.querySelectorAll('.active .wrong');
    this.falseBox.forEach((elem: any) => {
      elem.classList.remove('true');
      elem.classList.add('false');
    });

    if (this.falseBox.length === 0) {
      this.animation.playSegments([120, 195])
    } else {
      this.animation.playSegments([250, 350])
    }

    console.log(this.count);
    if (this.count === this.itemJson[0].items[0].content.length) {
      setTimeout(() => {
        this.question = true;
      }, 2500);
    }

    this.itemJson[0].items.filter((el) =>
      el.active
        ? el.content.length === this.count
          ? setTimeout(() => {
            this.question = true;
          }, 2500)
          : false
        : false
    );
  }

  nextQuestion() {
    this.counter += 1;
    this.question = false;
    this.questionsNumber = this.itemJson[0].items.length;

    if (this.questionsNumber != this.counter) {
      this.itemJson[0].items.forEach((element) => {
        element.active = false;
      });
      this.itemJson[0].items[this.counter].active = true;
    }
  }

  home() {
    location.reload()
  }
   start(event: any){
    event.target.classList.remove('startButton')
    this.startLo = true
  }
}
