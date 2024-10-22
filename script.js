// Function to clean and check if a string is a palindrome
function isPalindrome(str) {
    const cleanedStr = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
  }
  
  // Function to update character count and live palindrome validation
  function updatePalindromeCheck() {
    const input = document.getElementById('text-input').value;
    const resultElement = document.getElementById('result');
    const charCountElement = document.getElementById('char-count');
    const shareBtn = document.getElementById('share-btn');
  
    const cleanedInput = input.replace(/[^a-z0-9]/gi, '');
    charCountElement.textContent = `Character Count: ${cleanedInput.length}`;
  
    // If input is empty, reset result and hide share button
    if (!input) {
      resultElement.textContent = '';
      resultElement.classList.remove('show');
      shareBtn.style.display = 'none';
      return;
    }
  
    const isPal = isPalindrome(input);
    resultElement.classList.remove('show');
  
    if (isPal) {
      resultElement.textContent = `${input} is a palindrome`;
      resultElement.style.color = 'green';
    } else {
      resultElement.textContent = `${input} is not a palindrome`;
      resultElement.style.color = 'red';
    }
  
    setTimeout(() => {
      resultElement.classList.add('show');
    }, 10);
  
    // Show the share button and set up sharing
    shareBtn.style.display = 'block';
    shareBtn.onclick = () => shareResult(input, isPal);
  }
  
  // Function to handle the check button click
  document.getElementById('check-btn').addEventListener('click', function() {
    const input = document.getElementById('text-input').value;
  
    // Check if the input is empty
    if (!input) {
      alert('Please input a value');
      return;
    }
  
    updatePalindromeCheck();
  
    const isPal = isPalindrome(input);
  
    // Add result to history only when the button is clicked
    if (input) {
      addToHistory(input, isPal);
    }
  
    // Show a random palindrome fact
    showRandomFact();
  });
  
  // Function to share the result using Web Share API or Twitter
  function shareResult(input, isPalindrome) {
    const message = `I just checked '${input}' and it's ${isPalindrome ? 'a palindrome' : 'not a palindrome'}!`;
  
    if (navigator.share) {
      navigator.share({
        title: 'Palindrome Checker',
        text: message,
        url: window.location.href
      }).then(() => console.log('Share successful'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.href)}`;
      window.open(twitterUrl, '_blank');
    }
  }
  
  // Function to add a check result to the history list
  function addToHistory(input, isPal) {
    const historyList = document.getElementById('history-list');
    const li = document.createElement('li');
    li.textContent = `${input} - ${isPal ? 'Palindrome' : 'Not a Palindrome'}`;
    li.addEventListener('click', () => {
      document.getElementById('text-input').value = input;
      updatePalindromeCheck();
    });
    historyList.appendChild(li);
  }
  
  // Function to clear the history list
  function clearHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
  }
  
  // Function to show a random palindrome fact
  function showRandomFact() {
    const facts = [
      "The word 'palindrome' was coined by the English writer Ben Jonson in the 17th century.",
      "'A man, a plan, a canal, Panama' is one of the most famous palindromes.",
      "Palindromes date back to ancient times. One of the earliest palindromes is a Latin one: 'Sator Arepo Tenet Opera Rotas'.",
      "'Able was I ere I saw Elba' is a famous palindrome attributed to Napoleon.",
      "In mathematics, palindromic numbers are numbers that read the same forwards and backwards.",
      "'Madam, in Eden, I'm Adam' is a well-known phrase that is a palindrome.",
      "'Taco cat' is another fun, shorter palindrome.",
      "Palindrome words can also be names like 'Anna', 'Eve', and 'Otto'.",
      "The longest palindromic word in the Oxford English Dictionary is 'tattarrattat', coined by James Joyce in Ulysses."
    ];
  
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('fact').textContent = randomFact;
  }
  
  // Event listener to clear history
  document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
  
  // Dark/Light Mode Toggle
  document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    
    themeSwitch.addEventListener('change', function() {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
});