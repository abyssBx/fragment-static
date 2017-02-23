import * as React from "react";
import "./Tutorial.less"
import SwipeableViews from 'react-swipeable-views';


export default class Tutorial extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {
      bgList:["http://www.iquanwai.com/images/riseTutorial0.png","http://www.iquanwai.com/images/riseTutorial1.png",
        "http://www.iquanwai.com/images/riseTutorial2.png","http://www.iquanwai.com/images/riseTutorial3.png",
        "http://www.iquanwai.com/images/riseTutorial4.png","http://www.iquanwai.com/images/riseTutorial5.png",
        "http://www.iquanwai.com/images/riseTutorial6.png","http://www.iquanwai.com/images/riseTutorial7.png"],
      index:0,
      onShowEnd:props.onShowEnd || function(){console.log('显示完成')}
    }
  }



  componentWillMount(){

  }

  next(){
    const {index} = this.state;
    if(index===7){
      console.log('over');
      this.state.onShowEnd();
    } else {
      console.log(index+1)
      this.setState({index:index+1});
    }

  }


  render(){
    const {index,bgList} = this.state;
    console.log(bgList[index]);

    return (
      <div className="tutorial" onClick={()=>this.next()}>
        {this.state.bgList.map((item,seq)=>
          (<div className="item" style={{display:seq!==this.state.index?'none':'block'}}>
            <img key={seq} src={item}/>
          </div>))
        }
      </div>
    )
  }
}
