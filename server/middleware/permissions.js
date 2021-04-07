function canViewProject(user, project) {
    return (
        project.userId === user
    )
}
function scopedProject(user, projects) {
    return projects.filter(project => project.userId === user)
}

export {canViewProject, scopedProject}