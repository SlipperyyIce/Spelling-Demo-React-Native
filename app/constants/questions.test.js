const { questionData } = require('./questions');
//npm test

const testData = questionData

describe('testData', () => {

  // 1. Test to ensure no duplicate answers
  it('should not have duplicate answers', () => {
    const answers = testData.map(q => q.answer);
    const uniqueAnswers = new Set(answers);
    if (uniqueAnswers.size !== answers.length) {
      console.log('Duplicate answers found:', answers.filter((value, index, self) => self.indexOf(value) !== index));
    }
    expect(uniqueAnswers.size).toBe(answers.length);
  });

  // 2. Test to ensure every object has a difficulty
  it('should have a difficulty field for every question', () => {
    testData.forEach(q => {
      if (!q.hasOwnProperty('difficulty')) {
        console.log('Missing difficulty field:', q);
      }
      expect(q).toHaveProperty('difficulty');
    });
  });

  // 3. Test to ensure answer appears in message (ignores punctuation)
  it('should match the answer in the message, ignoring punctuation', () => {
    testData.forEach(q => {
      const cleanMessage = q.message.replace(/[.,'"]/g, '').toLowerCase();
      const cleanAnswer = q.answer.toLowerCase();

      const regex = new RegExp(`\\b${cleanAnswer}\\b`, 'i'); // 'i' for case-insensitive
      if (!regex.test(cleanMessage)) {
          console.log('Answer does not match message:', q);
      }
      expect(cleanMessage).toMatch(regex); 
    });
  });

  // 4. Test to ensure answer isn't a plural word mismatch (e.g. apple vs apples)
  it('should not match plural or mismatched versions of the answer', () => {
    testData.forEach(q => {
      const cleanMessage = q.message.replace(/[.,'"]/g, '').toLowerCase();
      const cleanAnswer = q.answer.toLowerCase();

      if (cleanMessage.includes(cleanAnswer + 's')) {
        console.log('Plural mismatch found for answer:', q);
      }
      expect(cleanMessage).not.toContain(cleanAnswer + 's');
    });
  });
});