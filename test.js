const bcrypt = require('bcrypt');

async function testHash() {
  const password = 'Football2215!';
  const hashed = await bcrypt.hash(password, 10); // Assuming salt rounds of 10
  console.log('Hashed password:', hashed);

  const comparisonResult = await bcrypt.compare(password, hashed);
  console.log('Password matches:', comparisonResult);
}

testHash();
