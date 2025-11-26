# SMS Spam Classifier (Deep Neural Network | NLP)

## Project Overview
This is the final required project for the freeCodeCamp Machine Learning Certification. The goal was to build a Neural Network capable of classifying raw SMS text messages as either **"ham"** (legitimate) or **"spam"**.

* **Final Result:** Passed all hidden test cases (Model achieved high accuracy, typically >98%).
* **Algorithm:** Recurrent Neural Network (RNN) architecture with a Global Average Pooling layer.

---

## Technical Methodology

This project focuses on the core steps of Natural Language Processing (NLP) for machine learning:

* **Data Preparation:** Converted labels ('ham' / 'spam') to numerical values (0 / 1).
* **Tokenization:** Converted raw text messages into sequences of integers using the Keras Tokenizer.
* **Sequence Padding:** Ensured all input messages were the same length using padding and truncation.
* **Model Architecture:**
    * **Embedding Layer:** Maps each word token to a dense vector space.
    * **Global Average Pooling:** Used to efficiently process the sequence of embeddings.
    * **Sigmoid Output:** Final classification layer outputting the probability of the message being spam.

---

## Live Code & Execution

Click the link below to view the executable Google Colab notebook.

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1j1mppFl3XFMIEjhhHw5oWM6SL3Ooug8c?usp=sharing)

