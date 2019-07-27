const query = (fields, token) => {
  const body = JSON.stringify({
    query: `
            ${fields}
    `,
  });

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
