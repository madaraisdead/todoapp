export default function projects(projects = [], action) {
  switch (action.type)
  {
    case 'FETCH':
      return action.payload;
    case 'CREATE':
      return [...projects, action.payload];
    case 'PROJECT_BY_ID':
      return action.payload
    case 'DELETE_PROJECT':
      return projects.filter(project => project._id !== action.payload)
    default:
    return projects;
  }
}
