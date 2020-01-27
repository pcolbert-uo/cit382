import React from "react";
import "./styles.css";
import { quizData } from "./data.js";

// Produce string array of quiz results
function average(data) {
  // Initialize output array
  let output = [];

  // Iterate through the quizzes
  for (let q = 0; q < quizData.quizzes.length; q++) {
    // Initialize variables
    let total = 0;
    let max = 0;
    let maxWho = "";
    let min = 10;
    let minWho = "";

    // Iterate through the scores of each quiz
    for (let s = 0; s < quizData.quizzes[q].scores.length; s++) {
      // Extract the quiz score and name
      const score = quizData.quizzes[q].scores[s].score;
      const name =
        quizData.quizzes[q].scores[s].last +
        ", " +
        quizData.quizzes[q].scores[s].first;

      // Accumulate the total score for the current quiz
      total += score;

      // Update max and min score and names
      if (score > max) {
        max = score;
        maxWho = name;
      }
      if (score < min) {
        min = score;
        minWho = name;
      }
    }

    // Extract quiz name
    let quiz = quizData.quizzes[q].quizName;

    // Calculate quiz average
    let avg =
      quizData.quizzes[q].scores.length > 0
        ? total / quizData.quizzes[q].scores.length
        : 0;

    // Use template literal to construct result and push to output array
    output.push(
      `${quiz}: ${avg}, max: ${max} (${maxWho}), min: ${min} (${minWho})`
    );
  }

  // Return string array
  return output;
}

// Produce div-separated JSX object
function averageJSX(data) {
  return data.map(item => <div>{item}</div>);
}

export default function App() {
  // Create averages string array
  const averages = average(quizData);

  // Return the final output
  return (
    <div className="App">
      <h1>Assignment 1 - JSX</h1>
      <h2>Quiz Results</h2>
      <div className="QuizRowEven QuizRowOdd">{averageJSX(averages)}</div>
    </div>
  );
}
