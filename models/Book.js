// models/Book.js
"use strict";

/**
 * Listing 17.6 (p. 249)
 * 새로운 스키마와 모델의 생성
 */
const mongoose = require("mongoose"),
  bookSchema = mongoose.Schema(
    {
      bookname: {
        // 강좌 스키마에 속성 추가
        type: String,
        required: true,
        unique: true,
      },
      author: {
        type: String,
        required: true,
      },
      publisher: {
        // 강좌 스키마에 속성 추가
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("Book", bookSchema);
