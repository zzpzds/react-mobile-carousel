import React, { ReactNode } from 'react'
import './carousel.css'

class CarouselComponent extends React.Component {
  constructor(props) {
    this.state = {
      slideList: [], //轮播nodelist
      carouselContentStyle: { //轮播容器样式
        width: 0, //总宽度
        left: 0, //左偏移距离
      }
    }
  }
  render() {
    return (
      <div ref={(div)=>{this.carouselLayout = div}} className="carousel-layout">
        <div ref={(div)=>{this.carouselContent = div}} className="carousel-content" style={this.state.carouselContentStyle}>
          {this.state.slideList.length > 0 && this.state.slideList.map((slide: ReactNode, index: number) => (
            <div className="slide" key={index} style={{width: this.props.slideWidth || '100%'}}>
              {slide}
            </div>
          ))}
        </div>
      </div>
    )
  }
  carouselLayout: HTMLDivElement
  carouselContent: HTMLDivElement
  startX: number = 0 //拖动开始的x坐标
  tempStartX: number = 0 //辅助值
  offsetLeft: number = 0 //偏移距离
  speed: number = 2 //灵敏度
  state: State = {
    slideList: [],
    carouselContentStyle: {
      width: 0,
      left: 0
    }
  }
  componentWillMount() {
    let slideList = Array.from(this.props.children as ReactNode[])
    slideList.unshift(slideList.pop())
    this.setState({
      slideList
    })
  }
  componentDidMount() {
    this.offsetLeft = -this.carouselLayout.clientWidth
    //定义容器宽度
    let width = this.props.slideWidth ? (typeof(this.props.slideWidth) === 'number' ? (this.props.slideWidth * this.state.slideList.length) : `${Number(this.props.slideWidth.substr(0, this.props.slideWidth.length - 1)) * this.state.slideList.length}%`) : `${100 * this.state.slideList.length}%`
    this.setState({
      carouselContentStyle: Object.assign({}, this.state.carouselContentStyle, {width, left: this.offsetLeft})
    })

    //拖动开始
    this.carouselContent.addEventListener('touchstart', (ev: TouchEvent) => {
      this.touchStartHandle(ev)
    })
    //拖动过程
    this.carouselContent.addEventListener('touchmove', (ev: TouchEvent) => {
      this.touchMoveHandle(ev)
    })
    //拖动结束
    this.carouselContent.addEventListener('touchend', (ev: TouchEvent) => {
      this.touchEndHandle(ev)
    })
  }
  touchStartHandle(ev: TouchEvent) {
    this.startX = ev.changedTouches[0].clientX
    this.tempStartX = this.startX
  } 
  touchMoveHandle(ev: TouchEvent) {
    let diff = ev.changedTouches[0].clientX - this.tempStartX
    this.tempStartX = ev.changedTouches[0].clientX
    this.offsetLeft += diff
    this.watchDragDiff(ev.changedTouches[0].clientX - this.startX)
    this.setState({
      carouselContentStyle: Object.assign({}, this.state.carouselContentStyle, {left: this.offsetLeft})
    })
  }
  touchEndHandle(ev: TouchEvent) {
    let endX = ev.changedTouches[0].clientX
    let diff = endX - this.startX
  }
  watchDragDiff(diff: number) {
    if (diff > 0) {
      this.state.slideList.unshift(this.state.slideList.pop())
      this.setState({
        slideList: this.state.slideList
      })
    }
  }
}