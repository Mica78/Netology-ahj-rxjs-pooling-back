const { faker } = require('@faker-js/faker');

function createRandomMessage(number) {
  const messages = [];
  for(let i = 0; i < number; i++) {
    messages.push(
      {
        "id": faker.string.uuid(),
        "from": faker.internet.email(),
        "subject": faker.lorem.words(Math.floor(Math.random() * 4)),
        "body": faker.lorem.words(Math.floor(Math.random() * 10)),
        "received": faker.date.past().getTime(),
      }
    )
  }
  return {
    "status": "ok",
    "timestamp": Date.now(),
    "messages": messages
  }
}

module.exports = createRandomMessage;
