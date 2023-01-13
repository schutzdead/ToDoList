const defaultParameter = (element, organise) => {

    const Inbox = element().newFolder('Inbox')
    const Today = element().newFolder('Today')
    const Week = element().newFolder('7 days')
    const defaultFolder = element().newFolder('Database goals')
    const defaultFolder2 = element().newFolder('Homework')
    const defaultTask1 = element().newTask('Clients', 'Get more than 100 profiles.', '13/01/2023', 'Medium', 'not', 'Database goals')
    const defaultTask2 = element().newTask('Performance', 'Optimise database.', '16/01/2023', 'High', 'not', 'Database goals')
    const defaultTask3 = element().newTask('Ressources', 'Improve customer profiles.', '31/01/2023', 'Low', 'not', 'Database goals')
    const defaultTask4 = element().newTask('Math', 'Need to do addition.', '18/01/2023', 'Low', 'not', 'Homework')
    const defaultTask5 = element().newTask('English', 'Oral on the Budapest Parliament.', '19/01/2023', 'High', 'not', 'Homework')
    organise().addTaskToFolder(defaultTask1, defaultTask2, defaultTask3, defaultTask4,defaultTask5)
    organise().addAllTaskToInbox()
    organise().addTaskToToday()
    organise().addTaskToWeek()
}

export {defaultParameter}