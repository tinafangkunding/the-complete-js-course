"parser": {
    "type": ...,
    "properties": {}
  }
  
  type = CSV | JSON | XLS | AVRO | PARQUET
  
  // if type = CSV, possible fields of "properties" are:
  // file-base rules:
  - fieldSeparator    string     (optional, default value is ',')
  - encoding          string     (optional, default value is UTF-8, possible values are UTF-8 | ASCII)
  - skipHeaderLines   integer    (skip first N lines and assume that the last line of these N lines contains column headers) (required)
  - skipFooterLines   integer    (skip last N lines)  (optional, default value is 0)
  - quoteCharacter    character  (specifies the single character string that indicates quoted values enclosed with a pair of quoteCharacter characters. The fieldSeparator can be a part of the quoted value) (optional, default value is '"')
  - escapeCharacter   character  (specifies the single character string that is used to escape quotes inside an already quoted value) (optional, default value is double quote character)
  - trimSpace         boolean    (specifies whether to remove leading and trailing white space from field values) (optional, default value is false)
  - replaceInvalidCharacters 
                      boolean    (specifies whether to replace invalid UTF-8 characters with the Unicode replacement character) (optional, default value is false)
  - multiLine         boolean    (specifies whether one record can span multiple lines) (optional, default value is false) 
  // Not supported
  // (Not supported in Spark 2.3) - lineSeparator   string       (optional, default value is '\n')
  // (Spark skips blank lines by default) - skipBlankLines    boolean    (optional, default value is true)
  
  // if type = JSON, possible fields of "properties" are:
  - multiLine         boolean    (specifies whether one record can span multiple lines. If multiLine is set to true, only one record, which can span multiple lines, per file can be parsed. If multiLine is set to false, multiple records, each record is on one line, can be parsed) (required)
  - allowComments     boolean    (specifies whether Java/C++ style comments are allowed inside JSON files) (optional, default value is false)
  
  // if type = XLS, possible fields of "properties" are:
  - header            boolean    (specifies whether headers are present in the Excel files) (required)
  
  // if type = PARQUET, AVRO or ORC, there is no possible field yet.