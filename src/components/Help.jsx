import React from 'react'
import {motion} from 'framer-motion'

export const Help = () =>{
    const goBack = () =>{
        window.location ='/'
    }
    return(
        <div className = 'help__wrapper'>
            <div className = 'help__header'>
                <button onClick = {()=>goBack()} className = 'help__back'>Back to App</button>
                <h1>Help</h1>
            </div>
            <motion.div initial = {{opacity: 0}} animate ={{opacity: 1}} transition={{duration: .6, delay: 1}} className='help__content'>
                <div className = 'help__block'>
                <span  className = 'help__highlight'>Adding a project : </span>  
                <span> click the "Add project" button from the navBar then enter project data, click the button "Add".</span>
                </div>
                 <div className = 'help__block'>
                 <span className = 'help__highlight'>Adding a task : </span>  
                <span> select a project, then click the "Add task" button, enter task data and click the button "Add".</span>
                 </div>
                 <div className = 'help__block'>
                 <span className = 'help__highlight'>Adding a list : </span>  
                <span> select a project of "Board" type, then click the "Add list" button, enter list title and click "Add" button.</span>
                 </div>
                 <div className = 'help__block'>
                 <span className = 'help__highlight'>Deleting a project : </span>  
                <span> select a project, then in tasks list click the trash icon and confirm deleting.</span>
                 </div>
                 <div className = 'help__block'>
                 <span className = 'help__highlight'>Set task completed : </span>  
                <span> select a porject of "Default" type, then click an empty circle before task text. Task will be set as completed. The same logic for uncompleting task.</span>
                 </div>
                 <div className = 'help__block'>
                 <span className = 'help__highlight'>Manipulating tasks in board mode : </span>  
                <span> select a project of "Board" type, then drag and drop task in the same list or any other you want. For example, you want to create task named "Do my homework" and you also have two lists: "ToDo" and "Doing". At the beginning you might add this task to list "ToDo", as soon as you started doing task you move it to "Doing" list. That's how it's done. </span>
                 </div>    
            </motion.div>
        </div>
    )
}