// my requests filter

export default function filter(myRequests, filters) {
  const filteredRequests = myRequests.filter(request => {
    if (filters.facility) {
      if (!request.building.includes(filters.facility)) {
        return false;
      }
    }
    if (filters.status) {
      if (!request.status.includes(filters.status)) {
        return false;
      }
    }
    if (filters.issue) {
      if (!request.issue.includes(filters.issue)) {
        return false;
      }
    }
    if (filters.department) {
      if (!request.department.includes(filters.department)) {
        return false;
      }
    }
    return true;
  });
  return filteredRequests;
}
