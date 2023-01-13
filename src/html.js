import { format } from 'date-fns'
import picture1 from './down.svg'
import { skeletonFolder } from './skeleton.js'
import { skeletonToDo } from './skeleton.js'
import { defaultParameter } from './defaultP.js'

var allFolder = []

var now = new Date();
now.setDate(now.getDate() + 7);
var nextWeek = format(now,'dd/MM/yyyy')

var actualDate = format(new Date(),'dd/MM/yyyy')

const element = () => {
    const newTask = (title, description, dueDate, priority, check='notCkeck', folder='') => {
        return {
            title,
            description,
            dueDate,
            priority,
            check,
            folder
        }
    }
    const newFolder = (title) => {
        allFolder.push([title])
        return{
            title
        }
    } 
    return {newTask, newFolder}
}

const organise = () => {
    const addTaskToFolder = (...task) => {
        for(let j=0;j<task.length;j++){
            for(let i=0;i<allFolder.length;i++){
                if(task[j].folder === allFolder[i][0]){
                    allFolder[i].push(task[j]);
                }
            }
        }
    }
    const addAllTaskToInbox = () => {
        for(let i=0;i<allFolder.length;i++){
            for(let j=1;j<allFolder[i].length;j++){
                if(allFolder[i][j]===undefined) continue;
                allFolder[0].push(allFolder[i][j])
            }
        }
    }
    const addTaskToToday = () => {
        for(let i=1;i<allFolder[0].length;i++){
            if(actualDate===allFolder[0][i].dueDate){
                allFolder[1].push(allFolder[0][i])
            }
        }
    }
    const addTaskToWeek = () => {
        const actualDate = format(new Date(),'dd/MM/yyyy')
        for(let i=1;i<allFolder[0].length;i++){
            if(allFolder[0][i].dueDate<=nextWeek){
                allFolder[2].push(allFolder[0][i])
            }
        }
    }
    return {addTaskToFolder, addAllTaskToInbox, addTaskToToday, addTaskToWeek}
}
defaultParameter(element, organise);

const skeleton = (() => {
    const folderContainer = document.querySelector('.leftside')
    const rightside = document.querySelector('.rightside')
    const eachFolderDiv = document.querySelectorAll('.folderDiv')
     
    for(let i=0; i<allFolder.length;i++){
        skeletonFolder(i, 0, folderContainer, allFolder);
    }

    document.querySelector('.leftside>div').classList.add('clicked')
    for(let j=0; j<allFolder[0].length-1;j++){
        skeletonToDo(0, j, rightside, allFolder, picture1);
    }

    eachFolderDiv.forEach(element => {element.addEventListener('click', () => {
        cleanClicked();
        element.classList.add('clicked')
        for(let i=0; i<allFolder.length;i++){
            if(element.textContent===allFolder[i][0]){
                cleantoDo();
                for(let j=0; j<allFolder[i].length-1;j++){
                    skeletonToDo(i, j, rightside, allFolder, picture1);
                    colorPriority();
                }
                openDetails();
            }     
        }
    })})
    
    const cleantoDo = () => {
        rightside.innerHTML = '';
    }

    const cleanClicked = () => {
        eachFolderDiv.forEach(element => {element.classList.remove('clicked')})
    }

    const colorPriority = () => {
        document.querySelectorAll('.toDoDivPriority').forEach(element => {    
            if(element.textContent==='High'){
                element.style.color = 'red';
            } else if (element.textContent==='Medium'){
                element.style.color = 'orange';
            } else {
                element.style.color = 'green';
            }
        });
    }
    
    const openDetails = () => {
        document.querySelectorAll('.toDoDescription').forEach(element => {
            element.addEventListener('click', () => {
                for(let i=0;i<allFolder.length;i++){
                    for(let j=0;j<allFolder[i].length;j++){
                        if(element.parentElement.firstChild.textContent===allFolder[i][j].title){
                            if(element.parentElement.classList.value==='globalToDoOpen'){
                                document.querySelector('.toDoDetail').remove();
                                element.parentElement.classList.replace('globalToDoOpen', 'globalToDo')
                                return
                            }
                            let toDoDetail = document.createElement('div')
                            toDoDetail.classList.add('toDoDetail');
                            element.parentElement.appendChild(toDoDetail)
                            toDoDetail.textContent = allFolder[i][j].description;
                            element.parentElement.classList.replace('globalToDo', 'globalToDoOpen')
                            return
                        }
                    }
                }
            });
        });
    }
    
    colorPriority();
    openDetails();
})();