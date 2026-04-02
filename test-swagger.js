const { createSwaggerSpec } = require('./src/config/swagger');

const spec = createSwaggerSpec(4000);

console.log('\n=== Swagger Spec Test ===\n');
console.log('Total paths:', Object.keys(spec.paths).length);
console.log('\nAll paths:');
Object.keys(spec.paths).forEach((path, index) => {
  console.log(`${index + 1}. ${path}`);
});

console.log('\nTags:');
spec.tags.forEach((tag, index) => {
  console.log(`${index + 1}. ${tag.name} - ${tag.description}`);
});
