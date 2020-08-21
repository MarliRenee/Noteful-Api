INSERT INTO noteful_folders ("name")
VALUES
  ('First Test Folder'),
  ('Second Test Folder'),
  ('Third Test Folder')
;

INSERT INTO noteful_notes ("name", content, folderId)
VALUES
  ('Note One', 'yada yada yada yada', 1),
  ('Note Two', 'Another test note, amazing content', 1),
  ('Note Three', 'Groundbreaking stuff', 2)
;