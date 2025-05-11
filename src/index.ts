import app from './server';

const PORT = process.env.PORT || 2025;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
