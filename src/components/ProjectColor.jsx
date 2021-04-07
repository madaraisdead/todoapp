import React, {createRef} from 'react'

export const ProjectColor = ({setShowColor, showColor, changeColor})=>{
  let color1 = createRef()

  const getColor1 = ()=>{
    let computed = getComputedStyle(color1.current)
    return computed.color;
  }
  let color2 = createRef()

  const getColor2 = ()=>{
    let computed = getComputedStyle(color2.current)
    return computed.color;
  }
  let color3 = createRef()

  const getColor3 = ()=>{
    let computed = getComputedStyle(color3.current)
    return computed.color;
  }
  let color4 = createRef()

  const getColor4 = ()=>{
    let computed = getComputedStyle(color4.current)
    return computed.color;
  }
  return(
    showColor && (
      <div className = 'project-color'>
        <ul className = 'project-color__list'>
          <li ref ={color1} className = 'project-color__list__1' onClick = {()=> { setShowColor(false); changeColor(getColor1())} }>
            Red
          </li>
          <li ref ={color2} className = 'project-color__list__2' onClick = {()=> {setShowColor(false);changeColor(getColor2()) }}>
            Blue
          </li>
          <li ref = {color3} className = 'project-color__list__3' onClick = {()=> {setShowColor(false);changeColor(getColor3())}}>
            Green
          </li>
          <li ref = {color4} className = 'project-color__list__4' onClick = {()=> {setShowColor(false);changeColor(getColor4())}}>
            Orange
          </li>
        </ul>
      </div>
    )
  )
}
