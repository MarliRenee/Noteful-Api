function makeNotesArray() {
    return [
      {
        id: 1,
        name: 'The very first note',
        folderid: 1,
        content: 'The very first test note. This is a big deal.',
        modified: '2029-01-22T16:28:32.615Z'
      },
      {
        id: 2,
        name: 'An underwhelming sequel',
        folderid: 2,
        content: 'You knew it was coming',
        modified: '2100-05-23T04:28:32.615Z'
      }
    ]
  }
  
  function makeMaliciousNote() {
    const maliciousNote = {
      id: 911,
      name: 'Naughty naughty very naughty <script>alert("xss");</script>',
      folderid: 1,
      content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
    }
    const expectedNote = {
      ...maliciousNote,
      name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
      maliciousNote,
      expectedNote,
    }
  }
  
  module.exports = {
    makeNotesArray,
    makeMaliciousNote
  }