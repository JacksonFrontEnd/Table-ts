const url = (endpoint) => `https://jsonplaceholder.typicode.com/users/`;

export const getTableData = async () => {
  const response = await fetch(url());
  return response.json();
};
