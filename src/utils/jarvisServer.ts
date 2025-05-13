export const getJarvisServerData = async (
  method: string,
  params: Record<string, any>,
) => {
  try {
    const serverData = await fetch(
      `https://api.jarvis.fun/api/mcp-server/call`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA4LCJ3YWxsZXRBZGRyZXNzIjpudWxsLCJlbWFpbCI6Im1jcC1zZXJ2ZXJAeW9wbWFpbC5jb20iLCJpYXQiOjE3NDcxMjY2NjF9.z72wYsUP8SM7wRgrORvzSkhzmhEGQomWvyn1rQvyKsQ`,
        },
        body: JSON.stringify({
          methodName: method,
          params: params,
        }),
      },
    );

    const JarvisResponse = await serverData.json();
    console.log('Jarvis response:', JarvisResponse);

    return JarvisResponse;
  } catch (error) {
    console.error('Error calling jarvis server:', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};
