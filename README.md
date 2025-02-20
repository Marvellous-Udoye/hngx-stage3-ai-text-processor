# AI-Powered Text Processor

## Overview
This project is an AI-powered text processing interface built using **Next.js, Tailwind CSS, TypeScript, and Headless UI**. It leverages Chrome's experimental AI APIs to provide text summarization, translation, and language detection within a chat-like interface.

> **Note:** You may need to enable experimental AI features in Chrome to access these APIs.

---

## Features

### Core Functionalities
- **Chat-Like UI:** Users can input text in a textarea at the bottom, and the processed output is displayed above, mimicking a chat interface.
- **Language Detection:** Automatically detects the language of the input text using the **Language Detector API**.
- **Summarization:** If the text exceeds 150 characters and is in English, a **"Summarize"** button appears to generate a summary.
- **Translation:** Users can select a target language and translate the output text using the **Translator API**.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Accessibility:** Keyboard-navigable interface with meaningful ARIA labels.

### Supported Languages for Translation
- English (`en`)
- Portuguese (`pt`)
- Spanish (`es`)
- Russian (`ru`)
- Turkish (`tr`)
- French (`fr`)

---

## Requirements & Implementation

### User Interface
- The UI should look like a chat interface with:
  - A **large input textarea** at the bottom.
  - A **send button** that displays only a send icon.
  - An **output area** above, displaying processed results.

### Functional Flow
1. **User Inputs Text:**  
   - Text appears in the output area upon submission.
   - The detected language is displayed below the text.

2. **Summarization (if applicable):**  
   - If the text is in English and exceeds 150 characters, a "Summarize" button is rendered.
   - Clicking it generates a summary using the **Summarizer API**.

3. **Translation:**  
   - A dropdown allows users to select a language.
   - Clicking "Translate" converts the text using the **Translator API**.

4. **Displaying Results:**  
   - Translated or summarized text is displayed below the initial output text.

---

## Tech Stack
- **Next.js** – React framework for building the UI.
- **Tailwind CSS** – Styling and responsive design.
- **TypeScript** – Type safety and maintainability.
- **Headless UI** – Accessible UI components.
- **Chrome AI APIs** – Text processing (summarization, translation, and language detection).
