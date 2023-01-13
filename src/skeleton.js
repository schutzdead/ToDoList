const skeletonFolder = (p1, p2, folderContainer, allFolder) => {
    let folderDiv = document.createElement('div');
    folderDiv.classList.add('folderDiv')
    folderContainer.appendChild(folderDiv)
    folderDiv.textContent = allFolder[p1][p2]
}

const skeletonToDo = (p1, p2, rightside, allFolder, picture1) => {
    let globalToDo = document.createElement('div')
    let toDoDivTitle = document.createElement('div')
    let toDoDivDue = document.createElement('div')
    let toDoDivPriority = document.createElement('div')
    let toDoDescription = document.createElement('div')

    globalToDo.classList.add('globalToDo');
    toDoDivTitle.classList.add('toDoDivTitle');
    toDoDivDue.classList.add('toDoDivDue');
    toDoDivPriority.classList.add('toDoDivPriority');
    toDoDescription.classList.add('toDoDescription');
    
    rightside.appendChild(globalToDo)
    globalToDo.appendChild(toDoDivTitle)
    globalToDo.appendChild(toDoDivDue)
    globalToDo.appendChild(toDoDivPriority)
    globalToDo.appendChild(toDoDescription)


    toDoDivTitle.textContent = allFolder[p1][p2+1].title;
    toDoDivDue.textContent = allFolder[p1][p2+1].dueDate;
    toDoDivPriority.textContent = allFolder[p1][p2+1].priority;
    toDoDescription.innerHTML = `<img src="${picture1}">`;
}

export{skeletonFolder, skeletonToDo}