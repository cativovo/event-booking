const query = (fields, variables, token) => {
  const graphqlQuery = {
    query: `
            ${fields}
    `,
  };

  if (variables) {
    graphqlQuery.variables = variables;
  }

  const body = JSON.stringify(graphqlQuery);

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    body,
    headers,
  }).then(res => res.json());
};

export default query;
