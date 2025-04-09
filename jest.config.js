export default { 
    testEnvironment: 'jest-environment-jsdom', 
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [], // evita transpilaciones en modulos exteriores (Firebase en este caso)
}