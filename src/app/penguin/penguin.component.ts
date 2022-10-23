import { Router } from '@angular/router'
import { Component, ElementRef, OnInit } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms'
import { jsonFile } from './typings'
import { AnimationOptions } from 'ngx-lottie'
import { AnimationItem } from 'lottie-web'

@Component({
  selector: 'app-penguin',
  templateUrl: './penguin.component.html',
  styleUrls: ['./penguin.component.scss'],
})
export class PenguinComponent implements OnInit {
  inputvaldation: UntypedFormGroup
  index: any
  rightBox: any
  falseBox: any
  counter: number = 0
  itemJson: jsonFile[] = [
    {
      items: [
        {
          id: 1,
          parag: 'ssssssssssss',
          content: [
            {
              input: {
                valid: ['1111'],
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
          id: 2,
          parag: 'ssssssssssss',
          content: [
            {
              input: {
                valid: ['2'],
              },
            },
            {
              input: {
                valid: ['2'],
              },
            }
          ],
        }
      ],
    },
  ]
  constructor(private router: Router, private elementRef: ElementRef) {
    this.inputvaldation = new UntypedFormGroup({
      value: new UntypedFormControl(),
    })
  }
  options: AnimationOptions = {
    path: '/assets/lottie/piggy-bank.json'
  };
  ngOnInit(): void {

  }
  handClick(event: any) {
    this.index = event.target.getAttribute('index')
    const trueValue = this.itemJson[0].items[0].content[this.index - 1].input
      .valid[0]
    let maxLength = trueValue.length
    event.target.setAttribute('maxlength', maxLength)
    document.querySelectorAll('.false').forEach((el) => {
      el.classList.remove("false")
    })

  }

  checkvalue(event: any) {
    const trueValue = this.itemJson[0].items[0].content[this.index - 1].input
      .valid[0]
    let maxLength = trueValue.length
    if (event.target.value == '') {
      event.target.classList.remove('right')
      event.target.classList.add('wrong')
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
    this.counter = 0
    this.rightBox = document.querySelectorAll('.right')
    this.rightBox.forEach((elem: any) => {
      elem.classList.add('true')
      elem.classList.remove('false')
      this.counter++
    })
    this.falseBox = document.querySelectorAll('.wrong')
    this.falseBox.forEach((elem: any) => {
      elem.classList.add('false')
      elem.classList.remove('true')
    })
    console.log(this.counter)
    if (this.counter === this.itemJson[0].items[0].content.length) {
      setTimeout(() => {
        this.router.navigate(['/feedback'])
      }, 1500);
    }
  }
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}

