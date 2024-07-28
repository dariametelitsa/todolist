module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  // Optional: To handle static assets like images
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  // Optional: To setup environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
